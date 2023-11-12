import React, { useState } from 'react';
import axios from 'axios';

const CreateSlot = (props) => {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/doctors/create_slot/${props.doctorId}`, {date,hour});
      console.log(response.data);
      // Handle successful schedule set
    } catch (error) {
      console.error(error);
      // Handle schedule set error
    }
  };
  return (
    <div className="create-slot">
      <div className="container">
        <h2>Create new slot</h2>
        <form className="create-slot-form" onSubmit={handleCreateSlot}>
          <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="text" placeholder="Hour" value={hour} onChange={(e) => setHour(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};
export default CreateSlot;