import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSlots = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('/doctors/doctor_id/slots');
        setSlots(response.data.slots);
      } catch (error) {
        console.error(error);
        // Handle fetch slots error
      }
    };

    fetchSlots();
  }, []);

  return (
    <div>
      <h2>View Slots</h2>
      {slots.map((slot) => (
        <div key={slot.startTime}>
          <p>Day: {slot.day}</p>
          <p>Start Time: {slot.startTime}</p>
          <p>End Time: {slot.endTime}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewSlots;