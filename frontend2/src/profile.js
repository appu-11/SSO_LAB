import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
const PrivatePage = () => {
  const [symbol, setSymbol] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.REACT_APP_STOCK_API_KEY}`
      );
      setPriceData(response.data['Global Quote']);
    } catch (error) {
      setError('Error fetching stock price. Please try again.');
      console.error('Error fetching stock price:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="private-page">
      <h2 className="page-title">Stock Price</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Enter Company Symbol:</label>
        <div className="input-group">
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Get Price'}
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {priceData && (
        <div className="price-details">
          <h3 className="symbol">{symbol} Stock Price</h3>
          <p>Open: {priceData['02. open']}</p>
          <p>High: {priceData['03. high']}</p>
          <p>Low: {priceData['04. low']}</p>
          <p>Price: {priceData['05. price']}</p>
          <p>Volume: {priceData['06. volume']}</p>
          <p>Last Updated: {priceData['07. latest trading day']}</p>
        </div>
      )}
    </div>
  );
};

export default PrivatePage;
