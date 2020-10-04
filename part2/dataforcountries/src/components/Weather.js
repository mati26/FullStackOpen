import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response => {
          setWeather(response.data);
        });
  };
  useEffect(fetchWeather, []);

  if (weather !== null) {
    return (
        <div>
          <h3>Weather in {country.capital}</h3>
          <div><b>temperature:</b> {weather.current.temperature} Celcius</div>
          <div><img src={weather.current.weather_icons} alt="weather-icon" width="50" height="50"/></div>
          <div><b>wind:</b> {weather.current.wind_speed} direction {weather.current.wind_dir}</div>
        </div>
    );
  } else {
    return <div/>;
  }
};

export default Weather