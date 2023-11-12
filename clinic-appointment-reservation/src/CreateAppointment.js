import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateAppointment = (props) => {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
      // Handle fetch doctors error
    }
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/patient/create_appointment/${props.patientName}`, {
        date,
        hour,
        doctorName,
      });
      console.log(response.data);
      // Handle successful schedule set
    } catch (error) {
      console.error(error);
      // Handle schedule set error
    }
  };

  return (
    <div className="create-appointment">
      <div className="container">
        <h2>Create new appointment</h2>
        <form className="create-slot-form" onSubmit={handleCreateAppointment}>
          <select value={doctorName} onChange={(e) => setDoctorName(e.target.value)}>
            <option value="">Choose the doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {`Dr.${doctor.name}`}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="text" placeholder="Hour" value={hour} onChange={(e) => setHour(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
