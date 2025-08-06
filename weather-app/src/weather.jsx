import React, { useEffect, useState } from 'react'
import DateTimeDisplay from "./clock";

// WeatherAPI:   https://www.weatherapi.com/my/


function Weather ()  {


  const [ status, setStatus ] = useState('Idle');
  const [ location, setLocation ] = useState('New York City');

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    ApiCall();
  }, []);

  const ApiCall = async () => {
    setStatus('Loadng...')

    try {
      const response = await fetch(    
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`
      );

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      console.log('API Response: ', data);
      setStatus('Success');

    } catch (err) {
      console.error('API Error: ', err)
      setStatus('Error');
    }
  };

  return (

    <div className="web-app">

      <div className='location-input'>
        <input 
          type="text" 
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={ApiCall}>Search</button>
      </div>

      <div className='weather-info'>
        <div className='forecast-info'>
          <DateTimeDisplay />

          <div className='conditions'>
            <h1>75° F</h1>
          </div>

          <div className='add-conditions'>
            <div className='cond1'>
              <p>Wind Speed</p>
            </div>
            <div className='cond2'>
              <p>Humidity</p>
            </div>
          </div>

        </div>

        <div className='forecast'>
          <div className='graph'>

          </div>

          <div className='cards'>

          </div>
        </div>

      </div>
      
        
    </div>

  );
}

export default Weather;