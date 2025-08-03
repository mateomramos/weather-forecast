import { useEffect, useState } from 'react';

function DateTimeDisplay() {
  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const update = () => setDateTime(new Date());

    // Sync to next minute
    const now = new Date();
    const delayUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      update(); // Sync exactly at the minute
      // Then update every minute
      const interval = setInterval(update, 60000);
      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }, delayUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='clock'>
        <p>{dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + dateTime.toLocaleDateString(undefined, { weekday: 'short' }) + ", "}</p>
        <p>{dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</p>

    </div>
  );
}

export default DateTimeDisplay;
