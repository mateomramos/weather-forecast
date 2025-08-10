import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';


function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {

        const { time, temp, icon, condition } = payload[0].payload;

        const [hh] = time.split(':');
        const hour = Number(hh);
        const displayHour = ((hour % 12) || 12) + (hour >= 12 ? ' PM' : ' AM');
        
        return (
            <div className='tooltip'>
                <p className='tooltip'>{displayHour}</p>
                <img className='tooltip' src={icon}></img>
                <span className='tooltip'>{temp}<sup>°F</sup></span>
            </div>
        )
    }
    return null;
}


function WeatherGraph({ day }) {

    if (!day) {
        return <p>No forecast data available.</p>
    }

    const data = day.hour.map((h) => ({
        time: h.time.slice(-5),
        temp: h.temp_f,
        icon: h.condition.icon
    }));


    return (
        <div className='graph'>
           <ResponsiveContainer>
                <LineChart data={data}>
                    <YAxis
                        domain={['auto', 'auto']}
                        tickMargin={6}
                    />
                    <Tooltip content={<CustomTooltip/>} />
                    <Line type="monotone" dataKey="temp" dot={false} />
                </LineChart>
            </ResponsiveContainer> 
        </div>
    );
}

export default WeatherGraph;