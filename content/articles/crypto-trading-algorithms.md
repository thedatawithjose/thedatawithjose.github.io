---
title: "Cryptocurrency Trading Algorithms: Building Automated Strategies"
date: "2024-03-01"
author: "Jose Acosta"
excerpt: "Design and implementation of automated cryptocurrency trading algorithms using Python, machine learning, and real-time data processing."
image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=400&fit=crop&crop=center"
---

## Cryptocurrency Trading Algorithms: Building Automated Strategies

The cryptocurrency market presents unique opportunities and challenges for algorithmic trading. This article explores the design and implementation of automated trading strategies, combining technical analysis, machine learning, and real-time data processing.

### Understanding the Crypto Trading Landscape

Cryptocurrency markets operate 24/7 with high volatility and liquidity. Key characteristics include:

- **High volatility**: Price swings of 10-20% in a single day are common
- **24/7 operation**: No market hours or closures
- **Global liquidity**: Trading across multiple exchanges
- **Low latency requirements**: Opportunities disappear in seconds
- **Regulatory uncertainty**: Changing compliance requirements

```python
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import asyncio
import logging
from enum import Enum

logger = logging.getLogger(__name__)

class OrderType(Enum):
    MARKET = "market"
    LIMIT = "limit"
    STOP_LOSS = "stop_loss"
    TAKE_PROFIT = "take_profit"

class OrderSide(Enum):
    BUY = "buy"
    SELL = "sell"

@dataclass
class TradingSignal:
    """Represents a trading signal with metadata"""
    symbol: str
    side: OrderSide
    order_type: OrderType
    quantity: float
    price: Optional[float] = None
    stop_loss: Optional[float] = None
    take_profit: Optional[float] = None
    confidence: float = 0.0
    strategy_name: str = ""
    timestamp: datetime = None
    metadata: Dict = None

    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now()

@dataclass
class MarketData:
    """Real-time market data structure"""
    symbol: str
    price: float
    volume: float
    timestamp: datetime
    bid: float
    ask: float
    bid_volume: float
    ask_volume: float
    high_24h: float
    low_24h: float
    volume_24h: float

class CryptoTradingEngine:
    def __init__(self, exchange_client, risk_manager, strategy_manager):
        self.exchange = exchange_client
        self.risk_manager = risk_manager
        self.strategy_manager = strategy_manager
        self.active_positions = {}
        self.trading_history = []

    async def execute_signal(self, signal: TradingSignal) -> bool:
        """Execute a trading signal with risk management"""

        # Validate signal
        if not self._validate_signal(signal):
            logger.warning(f"Signal validation failed: {signal}")
            return False

        # Check risk limits
        if not self.risk_manager.check_risk_limits(signal):
            logger.warning(f"Risk limits exceeded for signal: {signal}")
            return False

        try:
            # Execute order
            order_result = await self.exchange.place_order(
                symbol=signal.symbol,
                side=signal.side.value,
                order_type=signal.order_type.value,
                quantity=signal.quantity,
                price=signal.price
            )

            if order_result['status'] == 'filled':
                # Update positions
                self._update_positions(signal, order_result)

                # Record trade
                self.trading_history.append({
                    'signal': signal,
                    'order_result': order_result,
                    'timestamp': datetime.now()
                })

                logger.info(f"Successfully executed signal: {signal}")
                return True
            else:
                logger.warning(f"Order not filled: {order_result}")
                return False

        except Exception as e:
            logger.error(f"Error executing signal: {e}")
            return False

    def _validate_signal(self, signal: TradingSignal) -> bool:
        """Validate trading signal"""
        # Check required fields
        if not all([signal.symbol, signal.side, signal.quantity]):
            return False

        # Check quantity limits
        if signal.quantity <= 0:
            return False

        # Check price for limit orders
        if signal.order_type == OrderType.LIMIT and signal.price is None:
            return False

        return True

    def _update_positions(self, signal: TradingSignal, order_result: Dict):
        """Update active positions after trade execution"""
        symbol = signal.symbol

        if symbol not in self.active_positions:
            self.active_positions[symbol] = {
                'quantity': 0,
                'avg_price': 0,
                'unrealized_pnl': 0
            }

        position = self.active_positions[symbol]
        fill_price = order_result.get('avg_price', order_result.get('price'))
        fill_quantity = order_result.get('filled_quantity', signal.quantity)

        if signal.side == OrderSide.BUY:
            # Update average price and quantity
            total_value = position['quantity'] * position['avg_price'] + fill_quantity * fill_price
            position['quantity'] += fill_quantity
            position['avg_price'] = total_value / position['quantity'] if position['quantity'] > 0 else 0
        else:  # SELL
            # Reduce position
            position['quantity'] -= fill_quantity
            if position['quantity'] <= 0:
                position['quantity'] = 0
                position['avg_price'] = 0

        # Update unrealized P&L
        current_price = self._get_current_price(symbol)
        if position['quantity'] > 0:
            position['unrealized_pnl'] = position['quantity'] * (current_price - position['avg_price'])
        else:
            position['unrealized_pnl'] = 0

    def _get_current_price(self, symbol: str) -> float:
        """Get current price for symbol"""
        # Implementation depends on exchange client
        pass
```

### Technical Analysis Strategies

Implement various technical indicators and strategies:

```python
import talib
from scipy import stats
import pandas_ta as ta

class TechnicalAnalysis:
    def __init__(self, data_window: int = 100):
        self.data_window = data_window

    def calculate_indicators(self, df: pd.DataFrame) -> pd.DataFrame:
        """Calculate technical indicators"""

        # Moving averages
        df['SMA_20'] = ta.sma(df['close'], length=20)
        df['SMA_50'] = ta.sma(df['close'], length=50)
        df['EMA_12'] = ta.ema(df['close'], length=12)
        df['EMA_26'] = ta.ema(df['close'], length=26)

        # RSI
        df['RSI'] = ta.rsi(df['close'], length=14)

        # MACD
        macd = ta.macd(df['close'], fast=12, slow=26, signal=9)
        df['MACD'] = macd['MACD_12_26_9']
        df['MACD_signal'] = macd['MACDs_12_26_9']
        df['MACD_hist'] = macd['MACDh_12_26_9']

        # Bollinger Bands
        bb = ta.bbands(df['close'], length=20, std=2)
        df['BB_upper'] = bb['BBU_20_2.0']
        df['BB_middle'] = bb['BBM_20_2.0']
        df['BB_lower'] = bb['BBL_20_2.0']

        # Stochastic Oscillator
        stoch = ta.stoch(df['high'], df['low'], df['close'])
        df['stoch_k'] = stoch['STOCHk_14_3_3']
        df['stoch_d'] = stoch['STOCHd_14_3_3']

        # Volume indicators
        df['OBV'] = ta.obv(df['close'], df['volume'])

        # Volatility
        df['ATR'] = ta.atr(df['high'], df['low'], df['close'], length=14)

        return df

    def generate_signals(self, df: pd.DataFrame) -> List[TradingSignal]:
        """Generate trading signals based on technical analysis"""
        signals = []

        latest = df.iloc[-1]

        # Moving Average Crossover
        if self._check_ma_crossover(df):
            signal = self._create_ma_signal(df, latest.name)
            if signal:
                signals.append(signal)

        # RSI Divergence
        if self._check_rsi_divergence(df):
            signal = self._create_rsi_signal(df, latest.name)
            if signal:
                signals.append(signal)

        # Bollinger Band Squeeze
        if self._check_bb_squeeze(df):
            signal = self._create_bb_signal(df, latest.name)
            if signal:
                signals.append(signal)

        # MACD Crossover
        if self._check_macd_crossover(df):
            signal = self._create_macd_signal(df, latest.name)
            if signal:
                signals.append(signal)

        return signals

    def _check_ma_crossover(self, df: pd.DataFrame) -> bool:
        """Check for moving average crossover"""
        if len(df) < 2:
            return False

        prev = df.iloc[-2]
        curr = df.iloc[-1]

        # Golden Cross: Short MA crosses above long MA
        golden_cross = (prev['SMA_20'] <= prev['SMA_50']) and (curr['SMA_20'] > curr['SMA_50'])

        # Death Cross: Short MA crosses below long MA
        death_cross = (prev['SMA_20'] >= prev['SMA_50']) and (curr['SMA_20'] < curr['SMA_50'])

        return golden_cross or death_cross

    def _check_rsi_divergence(self, df: pd.DataFrame) -> bool:
        """Check for RSI divergence"""
        if len(df) < 20:
            return False

        # Check for bullish divergence (price makes lower low, RSI makes higher low)
        price_lows = self._find_local_minima(df['close'], window=5)
        rsi_lows = self._find_local_minima(df['RSI'], window=5)

        if len(price_lows) >= 2 and len(rsi_lows) >= 2:
            # Price making lower low
            price_divergence = price_lows[-1]['value'] < price_lows[-2]['value']
            # RSI making higher low
            rsi_divergence = rsi_lows[-1]['value'] > rsi_lows[-2]['value']

            return price_divergence and rsi_divergence

        return False

    def _check_bb_squeeze(self, df: pd.DataFrame) -> bool:
        """Check for Bollinger Band squeeze"""
        if len(df) < 20:
            return False

        # Calculate band width
        df['BB_width'] = (df['BB_upper'] - df['BB_lower']) / df['BB_middle']

        # Check if bands are squeezing (low volatility)
        recent_width = df['BB_width'].tail(10).mean()
        historical_width = df['BB_width'].tail(50).mean()

        return recent_width < historical_width * 0.8  # 20% narrower than average

    def _check_macd_crossover(self, df: pd.DataFrame) -> bool:
        """Check for MACD crossover"""
        if len(df) < 2:
            return False

        prev = df.iloc[-2]
        curr = df.iloc[-1]

        # MACD line crosses above signal line (bullish)
        bullish_cross = (prev['MACD'] <= prev['MACD_signal']) and (curr['MACD'] > curr['MACD_signal'])

        # MACD line crosses below signal line (bearish)
        bearish_cross = (prev['MACD'] >= prev['MACD_signal']) and (curr['MACD'] < curr['MACD_signal'])

        return bullish_cross or bearish_cross

    def _find_local_minima(self, series: pd.Series, window: int = 5) -> List[Dict]:
        """Find local minima in a series"""
        minima = []
        for i in range(window, len(series) - window):
            if all(series.iloc[i] <= series.iloc[i-j] for j in range(1, window+1)) and \
               all(series.iloc[i] <= series.iloc[i+j] for j in range(1, window+1)):
                minima.append({'index': i, 'value': series.iloc[i]})
        return minima

    def _create_ma_signal(self, df: pd.DataFrame, timestamp) -> Optional[TradingSignal]:
        """Create signal based on MA crossover"""
        prev = df.iloc[-2]
        curr = df.iloc[-1]

        if (prev['SMA_20'] <= prev['SMA_50']) and (curr['SMA_20'] > curr['SMA_50']):
            return TradingSignal(
                symbol=df.index.name or "UNKNOWN",
                side=OrderSide.BUY,
                order_type=OrderType.MARKET,
                quantity=0.01,  # Will be calculated by risk manager
                strategy_name="MA_Crossover",
                confidence=0.7
            )
        elif (prev['SMA_20'] >= prev['SMA_50']) and (curr['SMA_20'] < curr['SMA_50']):
            return TradingSignal(
                symbol=df.index.name or "UNKNOWN",
                side=OrderSide.SELL,
                order_type=OrderType.MARKET,
                quantity=0.01,
                strategy_name="MA_Crossover",
                confidence=0.7
            )

        return None
```

### Machine Learning-Based Strategies

Implement ML models for price prediction and strategy optimization:

```python
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, mean_squared_error
import xgboost as xgb
import lightgbm as lgb
from tensorflow import keras
import tensorflow as tf

class MLTradingStrategy:
    def __init__(self, model_type: str = 'xgboost'):
        self.model_type = model_type
        self.model = None
        self.scaler = StandardScaler()
        self.feature_columns = [
            'SMA_20', 'SMA_50', 'RSI', 'MACD', 'MACD_signal', 'MACD_hist',
            'BB_upper', 'BB_lower', 'stoch_k', 'stoch_d', 'OBV', 'ATR',
            'volume', 'returns', 'volatility'
        ]

    def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Prepare features for ML model"""
        # Calculate additional features
        df['returns'] = df['close'].pct_change()
        df['volatility'] = df['returns'].rolling(20).std()

        # Create target variables
        df['target_price'] = df['close'].shift(-1)  # Predict next price
        df['target_direction'] = (df['target_price'] > df['close']).astype(int)  # 1 for up, 0 for down

        # Remove NaN values
        df = df.dropna()

        return df

    def train_model(self, df: pd.DataFrame, target: str = 'target_direction'):
        """Train ML model"""
        features = df[self.feature_columns]
        target_values = df[target]

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            features, target_values, test_size=0.2, shuffle=False
        )

        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)

        # Train model based on type
        if self.model_type == 'xgboost':
            self.model = xgb.XGBClassifier(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                objective='binary:logistic'
            )
            self.model.fit(X_train_scaled, y_train)

            # Evaluate
            y_pred = self.model.predict(X_test_scaled)
            accuracy = accuracy_score(y_test, y_pred)
            logger.info(f"XGBoost model accuracy: {accuracy:.4f}")

        elif self.model_type == 'lightgbm':
            train_data = lgb.Dataset(X_train_scaled, label=y_train)
            params = {
                'objective': 'binary',
                'metric': 'binary_logloss',
                'boosting_type': 'gbdt',
                'num_leaves': 31,
                'learning_rate': 0.1,
                'feature_fraction': 0.9
            }
            self.model = lgb.train(params, train_data, num_boost_round=100)

        elif self.model_type == 'neural_network':
            self.model = keras.Sequential([
                keras.layers.Dense(64, activation='relu', input_shape=(len(self.feature_columns),)),
                keras.layers.Dropout(0.2),
                keras.layers.Dense(32, activation='relu'),
                keras.layers.Dropout(0.2),
                keras.layers.Dense(1, activation='sigmoid')
            ])

            self.model.compile(
                optimizer='adam',
                loss='binary_crossentropy',
                metrics=['accuracy']
            )

            self.model.fit(
                X_train_scaled, y_train,
                epochs=50,
                batch_size=32,
                validation_split=0.2,
                verbose=0
            )

    def predict_signal(self, df: pd.DataFrame) -> TradingSignal:
        """Generate trading signal using ML model"""
        if self.model is None:
            raise ValueError("Model not trained")

        # Get latest data
        latest_data = df.iloc[-1:][self.feature_columns]
        latest_scaled = self.scaler.transform(latest_data)

        if self.model_type == 'xgboost':
            prediction = self.model.predict_proba(latest_scaled)[0]
            confidence = max(prediction)
            direction = 1 if prediction[1] > prediction[0] else 0

        elif self.model_type == 'lightgbm':
            prediction = self.model.predict(latest_scaled)[0]
            confidence = abs(prediction - 0.5) * 2  # Convert to 0-1 scale
            direction = 1 if prediction > 0.5 else 0

        elif self.model_type == 'neural_network':
            prediction = self.model.predict(latest_scaled)[0][0]
            confidence = abs(prediction - 0.5) * 2
            direction = 1 if prediction > 0.5 else 0

        # Create signal
        side = OrderSide.BUY if direction == 1 else OrderSide.SELL

        return TradingSignal(
            symbol=df.index.name or "UNKNOWN",
            side=side,
            order_type=OrderType.MARKET,
            quantity=0.01,
            confidence=confidence,
            strategy_name=f"ML_{self.model_type}",
            metadata={'prediction_prob': prediction}
        )

class EnsembleTradingStrategy:
    def __init__(self):
        self.models = {
            'xgboost': MLTradingStrategy('xgboost'),
            'lightgbm': MLTradingStrategy('lightgbm'),
            'neural_net': MLTradingStrategy('neural_network')
        }
        self.weights = {'xgboost': 0.4, 'lightgbm': 0.35, 'neural_net': 0.25}

    def train_ensemble(self, df: pd.DataFrame):
        """Train all models in the ensemble"""
        for name, model in self.models.items():
            logger.info(f"Training {name} model...")
            model.train_model(df)

    def predict_ensemble(self, df: pd.DataFrame) -> TradingSignal:
        """Generate ensemble prediction"""
        predictions = {}
        confidences = {}

        for name, model in self.models.items():
            signal = model.predict_signal(df)
            predictions[name] = 1 if signal.side == OrderSide.BUY else 0
            confidences[name] = signal.confidence

        # Weighted ensemble prediction
        weighted_prediction = sum(
            predictions[name] * self.weights[name]
            for name in predictions.keys()
        )

        weighted_confidence = sum(
            confidences[name] * self.weights[name]
            for name in confidences.keys()
        )

        # Determine final direction
        final_direction = 1 if weighted_prediction > 0.5 else 0
        side = OrderSide.BUY if final_direction == 1 else OrderSide.SELL

        return TradingSignal(
            symbol=df.index.name or "UNKNOWN",
            side=side,
            order_type=OrderType.MARKET,
            quantity=0.01,
            confidence=weighted_confidence,
            strategy_name="Ensemble_ML",
            metadata={
                'individual_predictions': predictions,
                'individual_confidences': confidences,
                'weighted_prediction': weighted_prediction
            }
        )
```

### Risk Management System

Implement comprehensive risk management:

```python
class RiskManager:
    def __init__(self, max_position_size: float = 0.02, max_daily_loss: float = 0.05,
                 max_drawdown: float = 0.1):
        self.max_position_size = max_position_size  # Max 2% of portfolio per position
        self.max_daily_loss = max_daily_loss  # Max 5% daily loss
        self.max_drawdown = max_drawdown  # Max 10% drawdown

        self.portfolio_value = 10000  # Starting portfolio value
        self.daily_pnl = 0
        self.peak_value = self.portfolio_value
        self.current_drawdown = 0

    def check_risk_limits(self, signal: TradingSignal) -> bool:
        """Check if signal passes all risk limits"""

        # Check position size limit
        if not self._check_position_size(signal):
            return False

        # Check daily loss limit
        if not self._check_daily_loss():
            return False

        # Check drawdown limit
        if not self._check_drawdown():
            return False

        # Check correlation risk
        if not self._check_correlation_risk(signal):
            return False

        return True

    def _check_position_size(self, signal: TradingSignal) -> bool:
        """Check position size against portfolio limits"""
        # Calculate position value
        current_price = self._get_current_price(signal.symbol)
        position_value = signal.quantity * current_price

        # Check against max position size
        max_allowed = self.portfolio_value * self.max_position_size

        return position_value <= max_allowed

    def _check_daily_loss(self) -> bool:
        """Check daily loss limit"""
        return abs(self.daily_pnl) / self.portfolio_value <= self.max_daily_loss

    def _check_drawdown(self) -> bool:
        """Check drawdown limit"""
        return self.current_drawdown <= self.max_drawdown

    def _check_correlation_risk(self, signal: TradingSignal) -> bool:
        """Check correlation with existing positions"""
        # Simplified correlation check
        # In practice, would check correlation matrix of portfolio positions
        return True

    def update_portfolio(self, pnl: float):
        """Update portfolio value and risk metrics"""
        self.portfolio_value += pnl
        self.daily_pnl += pnl

        # Update drawdown
        if self.portfolio_value > self.peak_value:
            self.peak_value = self.portfolio_value
            self.current_drawdown = 0
        else:
            self.current_drawdown = (self.peak_value - self.portfolio_value) / self.peak_value

    def calculate_position_size(self, signal: TradingSignal,
                              volatility: float, stop_loss_pct: float = 0.02) -> float:
        """Calculate optimal position size using Kelly Criterion variation"""

        # Risk per trade (2% of portfolio)
        risk_per_trade = self.portfolio_value * 0.02

        # Stop loss distance
        current_price = self._get_current_price(signal.symbol)
        stop_loss_price = current_price * (1 - stop_loss_pct)
        risk_per_unit = current_price - stop_loss_price

        if risk_per_unit <= 0:
            return 0

        # Calculate position size
        position_size = risk_per_trade / risk_per_unit

        # Adjust for volatility (higher volatility = smaller position)
        volatility_adjustment = 1 / (1 + volatility)
        position_size *= volatility_adjustment

        # Ensure within limits
        max_position = self.portfolio_value * self.max_position_size / current_price
        position_size = min(position_size, max_position)

        return position_size

    def _get_current_price(self, symbol: str) -> float:
        """Get current price for symbol"""
        # Implementation depends on data source
        pass

class PortfolioRebalancing:
    def __init__(self, target_allocations: Dict[str, float]):
        self.target_allocations = target_allocations
        self.current_allocations = {}

    def should_rebalance(self, threshold: float = 0.05) -> bool:
        """Check if portfolio needs rebalancing"""
        for symbol, target_pct in self.target_allocations.items():
            current_pct = self.current_allocations.get(symbol, 0)
            if abs(current_pct - target_pct) > threshold:
                return True
        return False

    def calculate_rebalance_trades(self, portfolio_value: float) -> List[TradingSignal]:
        """Calculate trades needed to rebalance portfolio"""
        trades = []

        for symbol, target_pct in self.target_allocations.items():
            current_value = self.current_allocations.get(symbol, 0) * portfolio_value
            target_value = target_pct * portfolio_value

            value_difference = target_value - current_value

            if abs(value_difference) > portfolio_value * 0.01:  # 1% threshold
                current_price = self._get_current_price(symbol)
                quantity = abs(value_difference) / current_price

                side = OrderSide.BUY if value_difference > 0 else OrderSide.SELL

                trades.append(TradingSignal(
                    symbol=symbol,
                    side=side,
                    order_type=OrderType.MARKET,
                    quantity=quantity,
                    strategy_name="Portfolio_Rebalancing"
                ))

        return trades
```

### Real-Time Data Processing

Implement high-performance data processing for live trading:

```python
import websockets
import json
import asyncio
from concurrent.futures import ThreadPoolExecutor
import aiohttp
import time

class RealTimeDataProcessor:
    def __init__(self, symbols: List[str], update_callback):
        self.symbols = symbols
        self.update_callback = update_callback
        self.data_buffers = {symbol: [] for symbol in symbols}
        self.websocket_connections = {}

    async def start_data_stream(self):
        """Start real-time data streaming"""
        tasks = []

        # WebSocket connections for real-time data
        for symbol in self.symbols:
            task = asyncio.create_task(self._connect_websocket(symbol))
            tasks.append(task)

        # REST API polling as backup
        polling_task = asyncio.create_task(self._poll_rest_api())
        tasks.append(polling_task)

        await asyncio.gather(*tasks, return_exceptions=True)

    async def _connect_websocket(self, symbol: str):
        """Connect to WebSocket for real-time data"""
        uri = f"wss://stream.binance.com:9443/ws/{symbol.lower()}@trade"

        try:
            async with websockets.connect(uri) as websocket:
                self.websocket_connections[symbol] = websocket

                async for message in websocket:
                    data = json.loads(message)
                    await self._process_websocket_message(symbol, data)

        except Exception as e:
            logger.error(f"WebSocket error for {symbol}: {e}")
            # Fallback to REST API
            await self._fallback_to_rest(symbol)

    async def _process_websocket_message(self, symbol: str, data: Dict):
        """Process incoming WebSocket message"""
        try:
            # Parse Binance trade data
            market_data = MarketData(
                symbol=symbol,
                price=float(data['p']),
                volume=float(data['q']),
                timestamp=datetime.fromtimestamp(data['T'] / 1000),
                bid=0.0,  # Would need separate stream
                ask=0.0,  # Would need separate stream
                bid_volume=0.0,
                ask_volume=0.0,
                high_24h=0.0,  # Would need 24hr ticker stream
                low_24h=0.0,
                volume_24h=0.0
            )

            # Add to buffer
            self.data_buffers[symbol].append(market_data)

            # Keep only recent data (last 1000 points)
            if len(self.data_buffers[symbol]) > 1000:
                self.data_buffers[symbol] = self.data_buffers[symbol][-1000:]

            # Notify callback
            await self.update_callback(symbol, market_data)

        except Exception as e:
            logger.error(f"Error processing WebSocket message: {e}")

    async def _poll_rest_api(self):
        """Poll REST API as backup data source"""
        while True:
            try:
                for symbol in self.symbols:
                    if symbol not in self.websocket_connections:
                        # Fetch data via REST API
                        await self._fetch_rest_data(symbol)

                await asyncio.sleep(1)  # Poll every second

            except Exception as e:
                logger.error(f"REST API polling error: {e}")
                await asyncio.sleep(5)

    async def _fetch_rest_data(self, symbol: str):
        """Fetch data from REST API"""
        url = f"https://api.binance.com/api/v3/ticker/24hr?symbol={symbol}"

        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    data = await response.json()

                    market_data = MarketData(
                        symbol=symbol,
                        price=float(data['lastPrice']),
                        volume=float(data['volume']),
                        timestamp=datetime.now(),
                        bid=float(data['bidPrice']),
                        ask=float(data['askPrice']),
                        bid_volume=float(data['bidQty']),
                        ask_volume=float(data['askQty']),
                        high_24h=float(data['highPrice']),
                        low_24h=float(data['lowPrice']),
                        volume_24h=float(data['volume'])
                    )

                    await self.update_callback(symbol, market_data)

    def get_recent_data(self, symbol: str, n_points: int = 100) -> List[MarketData]:
        """Get recent market data for symbol"""
        return self.data_buffers[symbol][-n_points:] if symbol in self.data_buffers else []

    def calculate_realtime_indicators(self, symbol: str) -> Dict:
        """Calculate real-time technical indicators"""
        data = self.get_recent_data(symbol, 200)
        if not data:
            return {}

        # Convert to DataFrame for calculations
        df = pd.DataFrame([{
            'timestamp': d.timestamp,
            'close': d.price,
            'volume': d.volume,
            'high': d.high_24h,
            'low': d.low_24h
        } for d in data])

        # Calculate indicators
        df['SMA_20'] = ta.sma(df['close'], length=20)
        df['RSI'] = ta.rsi(df['close'], length=14)

        latest = df.iloc[-1]

        return {
            'sma_20': latest['SMA_20'],
            'rsi': latest['RSI'],
            'current_price': latest['close'],
            'volume': latest['volume']
        }
```

### Backtesting Framework

Implement comprehensive backtesting for strategy validation:

```python
class BacktestingEngine:
    def __init__(self, initial_capital: float = 10000):
        self.initial_capital = initial_capital
        self.capital = initial_capital
        self.positions = {}
        self.trades = []
        self.portfolio_values = []

    def run_backtest(self, strategy, historical_data: pd.DataFrame,
                    start_date: datetime, end_date: datetime) -> Dict:
        """Run backtest for a trading strategy"""

        # Filter data by date range
        mask = (historical_data.index >= start_date) & (historical_data.index <= end_date)
        data = historical_data[mask].copy()

        logger.info(f"Running backtest from {start_date} to {end_date}")
        logger.info(f"Data points: {len(data)}")

        # Initialize
        self.capital = self.initial_capital
        self.positions = {}
        self.trades = []
        self.portfolio_values = [self.initial_capital]

        # Run strategy
        for i in range(len(data)):
            current_data = data.iloc[:i+1]

            # Get signals from strategy
            signals = strategy.generate_signals(current_data)

            # Execute signals
            for signal in signals:
                self._execute_signal(signal, data.iloc[i])

            # Update portfolio value
            portfolio_value = self._calculate_portfolio_value(data.iloc[i])
            self.portfolio_values.append(portfolio_value)

        # Calculate performance metrics
        metrics = self._calculate_performance_metrics()

        return {
            'trades': self.trades,
            'portfolio_values': self.portfolio_values,
            'metrics': metrics,
            'final_capital': self.capital
        }

    def _execute_signal(self, signal: TradingSignal, current_bar: pd.Series):
        """Execute trading signal in backtest"""
        symbol = signal.symbol
        price = current_bar['close']
        timestamp = current_bar.name

        # Calculate actual quantity based on signal and available capital
        if signal.quantity == 0:  # Calculate based on risk management
            quantity = self._calculate_position_size(signal, current_bar)
        else:
            quantity = signal.quantity

        # Check if we can afford the trade
        cost = quantity * price
        if signal.side == OrderSide.BUY and cost > self.capital:
            quantity = self.capital / price * 0.95  # Leave 5% buffer
            cost = quantity * price

        if quantity <= 0:
            return

        # Execute trade
        if signal.side == OrderSide.BUY:
            if symbol not in self.positions:
                self.positions[symbol] = {'quantity': 0, 'avg_price': 0}

            # Update position
            position = self.positions[symbol]
            total_value = position['quantity'] * position['avg_price'] + quantity * price
            position['quantity'] += quantity
            position['avg_price'] = total_value / position['quantity']

            self.capital -= cost

        else:  # SELL
            if symbol in self.positions and self.positions[symbol]['quantity'] >= quantity:
                position = self.positions[symbol]

                # Calculate P&L
                pnl = quantity * (price - position['avg_price'])
                self.capital += quantity * price + pnl

                # Update position
                position['quantity'] -= quantity
                if position['quantity'] <= 0:
                    del self.positions[symbol]

        # Record trade
        self.trades.append({
            'timestamp': timestamp,
            'symbol': symbol,
            'side': signal.side.value,
            'quantity': quantity,
            'price': price,
            'strategy': signal.strategy_name
        })

    def _calculate_portfolio_value(self, current_bar: pd.Series) -> float:
        """Calculate current portfolio value"""
        portfolio_value = self.capital

        for symbol, position in self.positions.items():
            if symbol in current_bar:
                current_price = current_bar[symbol] if isinstance(current_bar, pd.Series) else current_bar['close']
                portfolio_value += position['quantity'] * current_price

        return portfolio_value

    def _calculate_performance_metrics(self) -> Dict:
        """Calculate comprehensive performance metrics"""
        if not self.portfolio_values:
            return {}

        # Basic metrics
        final_value = self.portfolio_values[-1]
        total_return = (final_value - self.initial_capital) / self.initial_capital

        # Daily returns
        daily_returns = pd.Series(self.portfolio_values).pct_change().dropna()

        # Sharpe ratio (assuming 252 trading days)
        if len(daily_returns) > 0:
            sharpe_ratio = np.sqrt(252) * (daily_returns.mean() / daily_returns.std())
        else:
            sharpe_ratio = 0

        # Maximum drawdown
        cumulative = pd.Series(self.portfolio_values)
        running_max = cumulative.expanding().max()
        drawdown = (cumulative - running_max) / running_max
        max_drawdown = drawdown.min()

        # Win rate
        winning_trades = sum(1 for trade in self.trades if trade.get('pnl', 0) > 0)
        win_rate = winning_trades / len(self.trades) if self.trades else 0

        # Profit factor
        gross_profit = sum(max(trade.get('pnl', 0), 0) for trade in self.trades)
        gross_loss = abs(sum(min(trade.get('pnl', 0), 0) for trade in self.trades))
        profit_factor = gross_profit / gross_loss if gross_loss > 0 else float('inf')

        return {
            'total_return': total_return,
            'sharpe_ratio': sharpe_ratio,
            'max_drawdown': max_drawdown,
            'win_rate': win_rate,
            'profit_factor': profit_factor,
            'total_trades': len(self.trades),
            'final_value': final_value
        }

    def _calculate_position_size(self, signal: TradingSignal, current_bar: pd.Series) -> float:
        """Calculate position size based on risk management"""
        # Simple fixed percentage (2% per trade)
        risk_per_trade = self.initial_capital * 0.02
        stop_loss_pct = 0.02  # 2% stop loss

        price = current_bar['close']
        stop_loss_distance = price * stop_loss_pct
        quantity = risk_per_trade / stop_loss_distance

        return quantity
```

### Conclusion

Building automated cryptocurrency trading algorithms requires combining technical analysis, machine learning, risk management, and real-time data processing. The framework presented above provides a solid foundation for developing robust trading systems.

Key considerations for successful crypto trading algorithms:

- **Data Quality**: Ensure high-quality, real-time data from reliable sources
- **Risk Management**: Implement comprehensive risk controls to protect capital
- **Backtesting**: Thoroughly test strategies on historical data before live deployment
- **Monitoring**: Continuously monitor system performance and market conditions
- **Adaptability**: Build systems that can adapt to changing market conditions

Remember that past performance doesn't guarantee future results, and cryptocurrency trading involves significant risk. Always start with small position sizes and gradually scale up as confidence in your system grows.