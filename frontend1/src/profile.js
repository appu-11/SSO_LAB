import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState(0);

  useEffect(() => {
    if (search === 1) {
      const fetchWeather = async () => {
        const options = {
          method: 'GET',
          url: 'https://weatherapi-com.p.rapidapi.com/current.json',
          params: { q: city },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        };

        try {
          const response = await axios.request(options);
          setWeatherData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchWeather();
      setSearch(0); 
    }
  }, [search, city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(1);
  };

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div className="weather-container">
          <div className="location">
            {weatherData.location.name}, {weatherData.location.country}
          </div>
          <div className="temperature">{weatherData.current.temp_c}°C</div>
          <div className="condition">
            {weatherData.current.condition.text}
          </div>
          <img
            className="weather-icon"
            src={`http:${weatherData.current.condition.icon}`}
            alt="Weather Icon"
          />
          <div className="details">
            <div>Humidity: {weatherData.current.humidity}%</div>
            <div>Wind: {weatherData.current.wind_kph} km/h</div>
            <div>Visibility: {weatherData.current.vis_km} km</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
