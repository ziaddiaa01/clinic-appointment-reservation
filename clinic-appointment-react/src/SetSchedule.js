import React, { useState } from 'react';
import axios from 'axios';

const SetSchedule = () => {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSetSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/doctors/doctor_id/schedule', { day, slots: [{ startTime, endTime }] });
      console.log(response.data);
      // Handle successful schedule set
    } catch (error) {
      console.error(error);
      // Handle schedule set error
    }
  };

  return (
    <div>
      <h2>Set Schedule</h2>
      <form onSubmit={handleSetSchedule}>
        <input type="text" placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />
        <input type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="text" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button type="submit">Set Schedule</button>
      </form>
    </div>
  );
};


export default SetSchedule;