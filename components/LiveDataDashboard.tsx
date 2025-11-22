'use client';

import { m } from 'framer-motion';
import { useState, useEffect } from 'react';

// Simulación de datos en tiempo real
const mockCryptoData = [
  { symbol: 'BTC', price: 67234, change: 2.3, trend: 'up' },
  { symbol: 'ETH', price: 2456, change: -1.2, trend: 'down' },
  { symbol: 'ADA', price: 0.45, change: 5.6, trend: 'up' },
  { symbol: 'SOL', price: 164, change: 3.4, trend: 'up' }
];

const tradingSignals = [
  { pair: 'BTC/USD', signal: 'BUY', confidence: 87, timeframe: '4H' },
  { pair: 'ETH/USD', signal: 'HOLD', confidence: 65, timeframe: '1D' },
  { pair: 'ADA/USD', signal: 'BUY', confidence: 92, timeframe: '2H' },
  { pair: 'SOL/USD', signal: 'SELL', confidence: 78, timeframe: '6H' }
];

const systemMetrics = {
  uptime: 98.2,
  apiCalls: 45629,
  dataProcessed: 156.7,
  activeAlgorithms: 12
};

export default function LiveDataDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cryptoData, setCryptoData] = useState(mockCryptoData);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simular actualizaciones de precios
      if (isLive) {
        setCryptoData(prev => prev.map(coin => ({
          ...coin,
          price: coin.price + (Math.random() - 0.5) * coin.price * 0.001,
          change: coin.change + (Math.random() - 0.5) * 2
        })));
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [isLive]);

  return (
    <section className="live-dashboard py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <m.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <h2 className="text-3xl font-bold">Live Data Dashboard</h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real-time market data, trading signals, and system performance metrics
          </p>
          <div className="text-sm text-gray-400 mt-2">
            Last updated: {currentTime.toLocaleTimeString()}
          </div>
        </m.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Crypto Prices */}
          <m.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-chart-line text-[#00BFA5] mr-3"></i>
              Crypto Prices
            </h3>
            <div className="space-y-4">
              {cryptoData.map((crypto, index) => (
                <m.div
                  key={crypto.symbol}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {crypto.symbol.slice(0, 2)}
                    </div>
                    <span className="font-semibold">{crypto.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-lg">
                      ${crypto.price.toFixed(2)}
                    </div>
                    <div className={`text-sm flex items-center ${
                      crypto.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <i className={`fas fa-caret-${crypto.change >= 0 ? 'up' : 'down'} mr-1`}></i>
                      {Math.abs(crypto.change).toFixed(2)}%
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Trading Signals */}
          <m.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-robot text-[#00BFA5] mr-3"></i>
              AI Trading Signals
            </h3>
            <div className="space-y-4">
              {tradingSignals.map((signal, index) => (
                <m.div
                  key={signal.pair}
                  className="p-4 bg-gray-700/30 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{signal.pair}</span>
                    <span className="text-xs bg-gray-600 px-2 py-1 rounded">
                      {signal.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      signal.signal === 'BUY' ? 'bg-green-500/20 text-green-400' :
                      signal.signal === 'SELL' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {signal.signal}
                    </span>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Confidence</div>
                      <div className="font-bold text-[#00BFA5]">{signal.confidence}%</div>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

          {/* System Metrics */}
          <m.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <i className="fas fa-server text-[#00BFA5] mr-3"></i>
              System Performance
            </h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {systemMetrics.uptime}%
                </div>
                <div className="text-sm text-gray-400">System Uptime</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${systemMetrics.uptime}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <div className="text-xl font-bold text-[#00BFA5]">
                    {systemMetrics.apiCalls.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">API Calls/Day</div>
                </div>
                <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                  <div className="text-xl font-bold text-[#00BFA5]">
                    {systemMetrics.dataProcessed}GB
                  </div>
                  <div className="text-xs text-gray-400">Data Processed</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-[#00BFA5] mb-1">
                  {systemMetrics.activeAlgorithms}
                </div>
                <div className="text-sm text-gray-400">Active Algorithms</div>
                <div className="flex justify-center gap-1 mt-2">
                  {[...Array(systemMetrics.activeAlgorithms)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-2 h-2 bg-[#00BFA5] rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Control Panel */}
        <m.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isLive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isLive ? 'Pause Live Updates' : 'Resume Live Updates'}
          </button>
          <div className="mt-2 text-sm text-gray-400">
            Data refreshes every 2 seconds when live
          </div>
        </m.div>
      </div>
    </section>
  );
}