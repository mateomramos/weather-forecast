import React, { useEffect, useState } from 'react'
import DateTimeDisplay from "./clock";
import WeatherGraph from './weatherGraph';
import ForecastCards from './forecastCards';


// WeatherAPI:   https://www.weatherapi.com/my/


function Weather ()  {


  const [ status, setStatus ] = useState('Idle');
  const [ location, setLocation ] = useState('New York City');
  const [ weatherData, setWeatherData ] =  useState(null);
  const [ selectedIndex, setSelectedIndex ] = useState(0);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    ApiCall();
  }, []);


  const ApiCall = async () => {
    setStatus('Loading...')

    try {
      const response = await fetch(    
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`
      );

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      console.log('API Response: ', data);
      setStatus('Success');
      setWeatherData(data);
      setLocation('');

    } catch (err) {
      console.error('API Error: ', err)
      setStatus('Error');
    }
  };


  const days = weatherData?.forecast?.forecastday?? [];



  return (

    <div className="web-app">
      
      <div className='location-input'>
        <input 
          type="text" 
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              ApiCall();
            }
          }}
        />
        <button onClick={ApiCall}>Search</button>
      </div>

      <div className='weather-info'>
          {weatherData ? (
            <>
              <div className='forecast-info'>
                <DateTimeDisplay />

                <div className='conditions'>
                  <h1>{weatherData.current.temp_f}<sup>°F</sup></h1>
                </div>

                <div className='add-conditions'>
                  <div className='cond1'>
                    <p>Wind Speed</p>
                    <p>{weatherData.current.wind_mph} MPH</p>
                  </div>
                  <div className='cond2'>
                    <p>Humidity</p>
                    <p>{weatherData.current.humidity}%</p>
                  </div>
                </div>

              </div>

              <div className='forecast'>
                <h1 className='location'>
                  {weatherData.location.country === "United States of America"
                    ? `${weatherData.location.name}, ${weatherData.location.region}`
                    : `${weatherData.location.name}, ${weatherData.location.country}`
                  }
                  
                  
                </h1>

                <WeatherGraph 
                  day={days[selectedIndex]}
                  unit="F"
                />

                <ForecastCards 
                  days={days}
                  selectedIndex={selectedIndex}
                  onSelect={setSelectedIndex}
                  unit="F"
                />

              </div>
            </>
          )
        
        : (
          <h2>{status}</h2>
        )

        }

      </div>
      
        
    </div>

  );
}

export default Weather;