---
title: "Building Real-Time Trading Systems with Python and WebSockets"
date: "2024-03-15"
author: "Jose Acosta"
excerpt: "A deep dive into architecting low-latency trading systems that can process hundreds of market updates per second with consistent performance."
image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop&crop=center"
---

## Building Real-Time Trading Systems with Python and WebSockets

In the high-stakes world of algorithmic trading, milliseconds can mean the difference between profit and loss. Building systems capable of processing market data in real-time requires careful architecture, optimized code, and robust error handling. This article explores how to build scalable, low-latency trading systems using Python and WebSocket connections.

### Understanding the Requirements

Real-time trading systems must handle several challenging requirements:

- **Sub-millisecond latency**: Process market updates within microseconds
- **High throughput**: Handle hundreds of thousands of messages per second
- **Reliability**: Maintain connections and recover from failures gracefully
- **Data integrity**: Ensure no message loss or duplication
- **Scalability**: Handle increased load during market volatility

### Core Architecture Components

A robust real-time trading system consists of several interconnected components:

1. **Market Data Feed**: WebSocket connections to exchange APIs
2. **Data Processing Engine**: Fast parsing and normalization of market data
3. **Order Management System**: Decision-making and order execution logic
4. **Risk Management**: Real-time position and exposure monitoring
5. **Logging and Monitoring**: Comprehensive observability

```python
import asyncio
import websockets
import json
import logging
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime
import aiohttp
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class MarketData:
    symbol: str
    price: float
    volume: float
    timestamp: datetime
    exchange: str
    bid_price: Optional[float] = None
    ask_price: Optional[float] = None
    bid_size: Optional[float] = None
    ask_size: Optional[float] = None

class RealTimeTradingEngine:
    def __init__(self):
        self.active_connections: Dict[str, websockets.WebSocketServerProtocol] = {}
        self.market_data_queue = asyncio.Queue(maxsize=100000)
        self.order_queue = asyncio.Queue(maxsize=10000)
        self.is_running = False

        # Trading parameters
        self.max_position_size = 1000
        self.risk_limit = 0.02  # 2% of portfolio
        self.symbols = ['BTCUSDT', 'ETHUSDT', 'ADAUSDT']

    async def start(self):
        """Start the trading engine"""
        self.is_running = True

        # Start background tasks
        tasks = [
            self._market_data_consumer(),
            self._order_processor(),
            self._risk_monitor(),
            self._health_check()
        ]

        # Add market data feed tasks for each symbol
        for symbol in self.symbols:
            tasks.append(self._connect_market_feed(symbol))

        await asyncio.gather(*tasks)

    async def _connect_market_feed(self, symbol: str):
        """Connect to market data WebSocket feed"""
        uri = f"wss://stream.binance.com:9443/ws/{symbol.lower()}@trade"

        while self.is_running:
            try:
                async with websockets.connect(uri) as websocket:
                    logger.info(f"Connected to {symbol} market feed")

                    while self.is_running:
                        message = await websocket.recv()
                        await self._process_market_message(symbol, message)

            except websockets.exceptions.ConnectionClosed:
                logger.warning(f"Connection closed for {symbol}, reconnecting...")
                await asyncio.sleep(1)
            except Exception as e:
                logger.error(f"Error in market feed for {symbol}: {e}")
                await asyncio.sleep(5)

    async def _process_market_message(self, symbol: str, message: str):
        """Process incoming market data message"""
        try:
            data = json.loads(message)

            # Parse Binance trade message
            market_data = MarketData(
                symbol=symbol,
                price=float(data['p']),
                volume=float(data['q']),
                timestamp=datetime.fromtimestamp(data['T'] / 1000),
                exchange='binance'
            )

            # Add to processing queue
            await self.market_data_queue.put(market_data)

            # Update internal price cache for fast access
            self._update_price_cache(market_data)

        except json.JSONDecodeError:
            logger.error(f"Invalid JSON message: {message}")
        except KeyError as e:
            logger.error(f"Missing key in message: {e}")
        except Exception as e:
            logger.error(f"Error processing message: {e}")

    def _update_price_cache(self, data: MarketData):
        """Update in-memory price cache for fast access"""
        # This would typically use Redis or similar for distributed cache
        pass

    async def _market_data_consumer(self):
        """Consume market data and trigger trading logic"""
        while self.is_running:
            try:
                data = await self.market_data_queue.get()

                # Apply trading strategy
                await self._apply_trading_strategy(data)

                self.market_data_queue.task_done()

            except Exception as e:
                logger.error(f"Error in market data consumer: {e}")

    async def _apply_trading_strategy(self, data: MarketData):
        """Apply trading strategy based on market data"""
        # Simple momentum strategy example
        if data.symbol not in self.strategy_state:
            self.strategy_state[data.symbol] = {
                'prices': [],
                'position': 0,
                'last_trade_price': 0
            }

        state = self.strategy_state[data.symbol]
        state['prices'].append(data.price)

        # Keep only last 100 prices for momentum calculation
        if len(state['prices']) > 100:
            state['prices'].pop(0)

        # Calculate momentum (simplified)
        if len(state['prices']) >= 20:
            short_ma = sum(state['prices'][-5:]) / 5
            long_ma = sum(state['prices'][-20:]) / 20

            momentum = (short_ma - long_ma) / long_ma

            # Generate trading signals
            if momentum > 0.001 and state['position'] <= 0:  # Buy signal
                await self._generate_buy_order(data, momentum)
            elif momentum < -0.001 and state['position'] >= 0:  # Sell signal
                await self._generate_sell_order(data, momentum)

    async def _generate_buy_order(self, data: MarketData, momentum: float):
        """Generate buy order"""
        order = {
            'type': 'buy',
            'symbol': data.symbol,
            'price': data.price,
            'quantity': self._calculate_position_size(data.price),
            'timestamp': datetime.utcnow(),
            'strategy': 'momentum',
            'momentum': momentum
        }

        await self.order_queue.put(order)
        logger.info(f"Generated buy order: {order}")

    async def _generate_sell_order(self, data: MarketData, momentum: float):
        """Generate sell order"""
        order = {
            'type': 'sell',
            'symbol': data.symbol,
            'price': data.price,
            'quantity': self._calculate_position_size(data.price),
            'timestamp': datetime.utcnow(),
            'strategy': 'momentum',
            'momentum': momentum
        }

        await self.order_queue.put(order)
        logger.info(f"Generated sell order: {order}")

    def _calculate_position_size(self, price: float) -> float:
        """Calculate position size based on risk management"""
        # Simplified position sizing
        risk_amount = self.portfolio_value * self.risk_limit
        stop_loss_pct = 0.02  # 2% stop loss
        position_size = risk_amount / (price * stop_loss_pct)

        # Cap at maximum position size
        return min(position_size, self.max_position_size)

    async def _order_processor(self):
        """Process orders and execute trades"""
        while self.is_running:
            try:
                order = await self.order_queue.get()

                # Check risk limits before execution
                if await self._check_risk_limits(order):
                    await self._execute_order(order)
                else:
                    logger.warning(f"Order rejected due to risk limits: {order}")

                self.order_queue.task_done()

            except Exception as e:
                logger.error(f"Error in order processor: {e}")

    async def _check_risk_limits(self, order: Dict) -> bool:
        """Check if order complies with risk management rules"""
        # Simplified risk checks
        total_exposure = sum(abs(pos) for pos in self.positions.values())

        if order['type'] == 'buy':
            new_exposure = total_exposure + (order['price'] * order['quantity'])
        else:
            new_exposure = total_exposure - (order['price'] * order['quantity'])

        max_exposure = self.portfolio_value * 0.1  # Max 10% exposure

        return new_exposure <= max_exposure

    async def _execute_order(self, order: Dict):
        """Execute order through exchange API"""
        try:
            # This would integrate with exchange API (Binance, etc.)
            # For demonstration, we'll simulate execution

            execution_result = {
                'order_id': f"order_{int(datetime.utcnow().timestamp())}",
                'status': 'filled',
                'executed_price': order['price'],
                'executed_quantity': order['quantity'],
                'fees': order['price'] * order['quantity'] * 0.001,  # 0.1% fee
                'timestamp': datetime.utcnow()
            }

            # Update positions
            symbol = order['symbol']
            if symbol not in self.positions:
                self.positions[symbol] = 0

            if order['type'] == 'buy':
                self.positions[symbol] += order['quantity']
            else:
                self.positions[symbol] -= order['quantity']

            logger.info(f"Executed order: {execution_result}")

        except Exception as e:
            logger.error(f"Error executing order: {e}")

    async def _risk_monitor(self):
        """Monitor positions and risk in real-time"""
        while self.is_running:
            try:
                # Calculate portfolio metrics
                total_value = self.portfolio_value
                total_exposure = sum(abs(price * qty) for price, qty in self.positions.items())

                exposure_ratio = total_exposure / total_value if total_value > 0 else 0

                # Check risk thresholds
                if exposure_ratio > 0.15:  # 15% exposure limit
                    logger.warning(f"High exposure ratio: {exposure_ratio:.2%}")
                    await self._reduce_exposure()

                # Log risk metrics every minute
                logger.info(f"Risk metrics - Exposure: {exposure_ratio:.2%}, Positions: {len(self.positions)}")

                await asyncio.sleep(60)  # Check every minute

            except Exception as e:
                logger.error(f"Error in risk monitor: {e}")

    async def _reduce_exposure(self):
        """Reduce portfolio exposure when risk limits are breached"""
        # Simplified exposure reduction logic
        for symbol, quantity in list(self.positions.items()):
            if quantity > 0:
                # Sell portion of position
                reduce_qty = quantity * 0.2  # Reduce by 20%
                order = {
                    'type': 'sell',
                    'symbol': symbol,
                    'quantity': reduce_qty,
                    'reason': 'risk_reduction'
                }
                await self.order_queue.put(order)

    async def _health_check(self):
        """Perform health checks and report system status"""
        while self.is_running:
            try:
                health_status = {
                    'timestamp': datetime.utcnow(),
                    'market_data_queue_size': self.market_data_queue.qsize(),
                    'order_queue_size': self.order_queue.qsize(),
                    'active_positions': len(self.positions),
                    'total_exposure': sum(abs(price * qty) for price, qty in self.positions.items()),
                    'connections_status': 'healthy' if len(self.active_connections) > 0 else 'degraded'
                }

                # Log health status
                logger.info(f"Health check: {health_status}")

                # Send to monitoring system (e.g., DataDog, Prometheus)
                await self._send_metrics(health_status)

                await asyncio.sleep(30)  # Health check every 30 seconds

            except Exception as e:
                logger.error(f"Error in health check: {e}")

    async def _send_metrics(self, metrics: Dict):
        """Send metrics to monitoring system"""
        # Implementation for metrics collection
        pass

    async def stop(self):
        """Stop the trading engine gracefully"""
        self.is_running = False
        logger.info("Trading engine stopped")

# Global state (in production, use Redis/database)
engine = RealTimeTradingEngine()
engine.portfolio_value = 100000  # $100k portfolio
engine.positions = {}
engine.strategy_state = {}

async def main():
    try:
        await engine.start()
    except KeyboardInterrupt:
        logger.info("Received shutdown signal")
        await engine.stop()
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        await engine.stop()

if __name__ == "__main__":
    asyncio.run(main())
```

### Performance Optimization Techniques

To achieve the required low latency, several optimization techniques are crucial:

#### 1. Asynchronous Programming
Using `asyncio` allows handling multiple WebSocket connections concurrently without blocking.

#### 2. Efficient Data Structures
Using appropriate data structures for fast access and updates:

```python
from collections import deque
import time

class CircularBuffer:
    """High-performance circular buffer for time-series data"""
    def __init__(self, size: int):
        self.buffer = deque(maxlen=size)
        self.size = size

    def add(self, value: float, timestamp: float = None):
        """Add value to buffer"""
        if timestamp is None:
            timestamp = time.time()
        self.buffer.append((timestamp, value))

    def get_last_n(self, n: int) -> List[float]:
        """Get last n values"""
        return [value for _, value in list(self.buffer)[-n:]]

    def get_time_window(self, seconds: float) -> List[float]:
        """Get values within time window"""
        cutoff_time = time.time() - seconds
        return [value for ts, value in self.buffer if ts >= cutoff_time]
```

#### 3. Memory Pooling
Pre-allocating objects to reduce garbage collection overhead:

```python
import array

class ObjectPool:
    """Object pool for MarketData objects to reduce GC pressure"""
    def __init__(self, pool_size: int = 10000):
        self.pool = [MarketData('', 0.0, 0.0, datetime.min, '') for _ in range(pool_size)]
        self.available = set(range(pool_size))

    def get_object(self) -> MarketData:
        """Get an available object from the pool"""
        if not self.available:
            # Pool exhausted, create new object
            return MarketData('', 0.0, 0.0, datetime.min, '')

        index = self.available.pop()
        return self.pool[index]

    def return_object(self, obj: MarketData):
        """Return object to pool"""
        # Find object in pool and mark as available
        for i, pooled_obj in enumerate(self.pool):
            if pooled_obj is obj:
                self.available.add(i)
                break
```

### Error Handling and Resilience

Real-time trading systems must be resilient to network failures, exchange outages, and data inconsistencies:

```python
class CircuitBreaker:
    """Circuit breaker pattern for external service calls"""
    def __init__(self, failure_threshold: int = 5, recovery_timeout: int = 60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = 0
        self.state = 'closed'  # closed, open, half-open

    async def call(self, func, *args, **kwargs):
        if self.state == 'open':
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = 'half-open'
            else:
                raise Exception("Circuit breaker is open")

        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e

    def _on_success(self):
        self.failure_count = 0
        self.state = 'closed'

    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()

        if self.failure_count >= self.failure_threshold:
            self.state = 'open'
```

### Monitoring and Observability

Comprehensive monitoring is essential for maintaining system reliability:

```python
import psutil
import GPUtil

class SystemMonitor:
    def __init__(self):
        self.metrics = {}

    def collect_system_metrics(self) -> Dict:
        """Collect system performance metrics"""
        return {
            'cpu_percent': psutil.cpu_percent(interval=1),
            'memory_percent': psutil.virtual_memory().percent,
            'disk_usage': psutil.disk_usage('/').percent,
            'network_connections': len(psutil.net_connections()),
            'gpu_memory': self._get_gpu_memory() if GPUtil.getGPUs() else None,
            'timestamp': datetime.utcnow()
        }

    def _get_gpu_memory(self) -> Dict:
        """Get GPU memory usage"""
        gpus = GPUtil.getGPUs()
        return {
            'used': gpus[0].memoryUsed,
            'total': gpus[0].memoryTotal,
            'free': gpus[0].memoryFree
        } if gpus else {}

    def check_thresholds(self, metrics: Dict) -> List[str]:
        """Check if metrics exceed thresholds"""
        alerts = []

        if metrics['cpu_percent'] > 90:
            alerts.append(f"High CPU usage: {metrics['cpu_percent']}%")

        if metrics['memory_percent'] > 85:
            alerts.append(f"High memory usage: {metrics['memory_percent']}%")

        return alerts
```

### Deployment Considerations

For production deployment, consider:

1. **Containerization**: Use Docker for consistent deployment
2. **Orchestration**: Kubernetes for scaling and management
3. **Load Balancing**: Distribute load across multiple instances
4. **Database Integration**: Persistent storage for positions and trade history
5. **Backup Systems**: Redundant feeds and failover mechanisms

### Conclusion

Building real-time trading systems with Python and WebSockets requires careful attention to performance, reliability, and risk management. The architecture presented here provides a solid foundation that can be extended and customized based on specific trading strategies and requirements.

Remember that trading involves significant financial risk, and any real trading system should include comprehensive testing, paper trading phases, and gradual deployment with proper risk controls.