import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const INITIAL_WATCHES = [
  { id: 1, brand: 'Rolex', name: 'Submariner', price: 12000, history: [12000] },
  { id: 2, brand: 'Omega', name: 'Speedmaster', price: 7500, history: [7500] },
  { id: 3, brand: 'Tag Heuer', name: 'Carrera', price: 4500, history: [4500] },
  { id: 4, brand: 'Seiko', name: 'Prospex', price: 1200, history: [1200] },
  { id: 5, brand: 'Casio', name: 'G-Shock', price: 150, history: [150] },
];

const NEWS_TEMPLATES = [
  { text: "announces a limited edition release!", impact: 0.15 },
  { text: "supply chain issues halt production.", impact: -0.10 },
  { text: "wins 'Watch of the Year' award.", impact: 0.20 },
  { text: "CEO steps down amid scandal.", impact: -0.15 },
  { text: "seen on wrist of top movie star.", impact: 0.12 },
  { text: "floods market with excess inventory.", impact: -0.08 },
];

function TradingDashboard() {
  const [cash, setCash] = useState(10000);
  const [inventory, setInventory] = useState([]);
  const [marketWatches, setMarketWatches] = useState(INITIAL_WATCHES);
  const [newsFeed, setNewsFeed] = useState([]);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const savedCash = localStorage.getItem('watchApp_cash');
    const savedInventory = localStorage.getItem('watchApp_inventory');
    if (savedCash) setCash(JSON.parse(savedCash));
    if (savedInventory) setInventory(JSON.parse(savedInventory));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchApp_cash', JSON.stringify(cash));
    localStorage.setItem('watchApp_inventory', JSON.stringify(inventory));
  }, [cash, inventory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleMarketUpdate();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMarketUpdate = () => {
    let activeNews = null;
    if (Math.random() > 0.5) {
      const randomWatch = marketWatches[Math.floor(Math.random() * marketWatches.length)];
      const randomTemplate = NEWS_TEMPLATES[Math.floor(Math.random() * NEWS_TEMPLATES.length)];
      
      activeNews = {
        id: Date.now(),
        brand: randomWatch.brand,
        text: randomTemplate.text,
        impact: randomTemplate.impact,
        time: new Date().toLocaleTimeString()
      };

      setNewsFeed(prev => [activeNews, ...prev].slice(0, 4));
    }

    setMarketWatches((current) =>
      current.map((watch) => {
        let changePercent = 0;

        if (activeNews && watch.brand === activeNews.brand) {
          changePercent = activeNews.impact;
        } else {
          changePercent = (Math.random() * 0.1) - 0.05;
        }

        let newPrice = Math.floor(watch.price * (1 + changePercent));
        if (newPrice < 10) newPrice = 10;

        const newHistory = [...watch.history, newPrice];
        if (newHistory.length > 10) newHistory.shift();

        return { ...watch, price: newPrice, history: newHistory };
      })
    );
  };

  const handleBuy = (watch) => {
    if (cash >= watch.price) {
      setCash(cash - watch.price);
      setInventory([...inventory, { ...watch, uniqueId: Date.now(), purchasePrice: watch.price }]);
    }
  };

  const handleSell = (item, currentPrice) => {
    setCash(cash + currentPrice);
    setInventory(inventory.filter((i) => i.uniqueId !== item.uniqueId));
  };

  const calculateTotalValue = () => {
    const assetValue = inventory.reduce((total, item) => {
      const currentMarketData = marketWatches.find(w => w.id === item.id);
      return total + (currentMarketData ? currentMarketData.price : 0);
    }, 0);
    return cash + assetValue;
  };

  return (
    <div className="trading-dashboard">
      <header className="dashboard-header">
        <h1>⌚ Watch Trading Simulator</h1>
        <div className="stats-container">
          <div className="stat-box">
            <span>Cash</span>
            <strong>${cash.toLocaleString()}</strong>
          </div>
          <div className="stat-box">
            <span>Net Worth</span>
            <strong>${calculateTotalValue().toLocaleString()}</strong>
          </div>
          <div className="stat-box timer">
            <span>Next Update</span>
            <strong>{timer}s</strong>
          </div>
        </div>
      </header>

      <div className="main-layout">
        <div className="content-column">
          <section className="section">
            <h2>Marketplace</h2>
            <div className="card-grid">
              {marketWatches.map((watch) => {
                const startPrice = watch.history[0];
                const percentChange = ((watch.price - startPrice) / startPrice) * 100;
                const isPositive = percentChange >= 0;
                const color = isPositive ? '#10b981' : '#ef4444';

                const chartData = {
                  labels: watch.history.map((_, i) => i),
                  datasets: [{
                    data: watch.history,
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2,
                  }],
                };
                const chartOptions = {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false }, tooltip: { enabled: true } },
                  scales: { x: { display: false }, y: { display: false } },
                };

                return (
                  <div key={watch.id} className="card market-card">
                    <div className="card-header">
                      <h3>{watch.brand}</h3>
                      <span className="model-name">{watch.name}</span>
                    </div>
                    
                    <div className="chart-container">
                      <Line data={chartData} options={chartOptions} />
                    </div>

                    <div className="price-row">
                      <span className="price-tag">${watch.price.toLocaleString()}</span>
                      <span style={{ color: color, fontWeight: 'bold' }}>
                        {isPositive ? '▲' : '▼'} {Math.abs(percentChange).toFixed(1)}%
                      </span>
                    </div>

                    <button onClick={() => handleBuy(watch)} disabled={cash < watch.price} className="btn buy-btn">
                      Buy
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="section">
            <h2>Your Portfolio</h2>
            {inventory.length === 0 ? <p className="empty">No watches owned.</p> : (
              <div className="card-grid">
                {inventory.map((item) => {
                  const liveWatch = marketWatches.find(w => w.id === item.id);
                  const currentPrice = liveWatch ? liveWatch.price : item.purchasePrice;
                  const profit = currentPrice - item.purchasePrice;
                  const isProfit = profit >= 0;

                  return (
                    <div key={item.uniqueId} className="card portfolio-card">
                      <h3>{item.brand}</h3>
                      <div className="portfolio-stats">
                        <div className="row"><span>Bought:</span> <span>${item.purchasePrice.toLocaleString()}</span></div>
                        <div className="row"><span>Val:</span> <strong>${currentPrice.toLocaleString()}</strong></div>
                        <div className="row">
                          <span>P/L:</span> 
                          <span style={{ color: isProfit ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                            {isProfit ? '+' : ''}{profit.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button onClick={() => handleSell(item, currentPrice)} className="btn sell-btn">Sell</button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <div className="sidebar-column">
          <div className="news-panel">
            <h3>📰 Market News</h3>
            {newsFeed.length === 0 ? (
              <p className="empty-news">Market is quiet...</p>
            ) : (
              <div className="news-list">
                {newsFeed.map((news) => (
                  <div key={news.id} className={`news-item ${news.impact > 0 ? 'good-news' : 'bad-news'}`}>
                    <div className="news-header">
                      <strong>{news.brand}</strong>
                      <span className="news-time">{news.time}</span>
                    </div>
                    <p>{news.text}</p>
                    <div className="impact-badge">
                      Impact: {news.impact > 0 ? '📈 +' : '📉 '}{Math.abs(news.impact * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingDashboard;
