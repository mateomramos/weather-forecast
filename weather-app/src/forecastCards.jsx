import React from 'react';

function ForecastCards({ days, selectedIndex, onSelect, unit }) {

    if (!days.length) {
        return <p>No Forecast Cards Available</p>;
    }
    

    return (
        <div className='forecastCards'>
            
            {days.map((day, index) => {
                const date = new Date(day.date);
                const label = date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'numeric',
                    day: 'numeric'
                });
                const iconUrl = day.day.condition.icon;
                const maxTemp = Math.round(day.day.maxtemp_f);
                const minTemp = Math.round(day.day.mintemp_f);
            
                return (
                    <div
                        key={day.date}
                        className={`card`}
                        id={`${index === selectedIndex ? 'activeCard' : ""}`}
                        onClick={() => onSelect(index)}
                    >
                        <h4 id='card'>{label}</h4>
                        <img src={iconUrl} id='cardIcon'/>
                        <p id='cardCondition'>{day.day.condition.text}</p>
                        <p id='cardTempRange'>{maxTemp}° F / {minTemp}° F</p>
                    </div>
                )


            })}
        </div>
    )

}

export default ForecastCards;