import React, { useEffect, useState } from 'react'
import DateTimeDisplay from "./clock";

// WeatherAPI:   https://www.weatherapi.com/my/


function Weather ()  {

    return (

      <div className="web-app">

        <div className='location-input'>
          <input type="text" placeholder="Enter location" />
          <button>Search</button>
        </div>

        <div className='weather-info'>
          <div className='forecast-info'>
            <DateTimeDisplay />

          </div>

          <div className='forecast'>

          </div>

        </div>
        
          
      </div>

    );
}

export default Weather;