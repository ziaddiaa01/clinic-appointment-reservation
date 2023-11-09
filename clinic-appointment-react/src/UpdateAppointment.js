import React, { useState } from 'react';
import axios from 'axios';

const UpdateAppointment = () => {
  const [doctorId, setDoctorId] = useState('');
  const [slot, setSlot] = useState('');

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/appointments/appointment_id', { doctorId, slot });
      console.log(response.data);
      // Handle successful appointment update
    } catch (error) {
      console.error(error);
     // Handle appointment update error
}
};
return (
<div>
<h2>Update Appointment</h2>
<form onSubmit={handleUpdateAppointment}>
<label htmlFor="doctorId">Doctor ID:</label>
<input type="text" id="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} />
    <label htmlFor="slot">Slot:</label>
    <input type="text" id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} />

    <button type="submit">Update</button>
  </form>
</div>
);
};
export default UpdateAppointment;