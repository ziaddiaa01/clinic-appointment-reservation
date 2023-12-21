import React from 'react';
import ViewSlots from './ViewSlots';
import CreateSlot from './CreateSlot';
const DoctorDashboard = (props) => {
  return (
    <div className="doctor-board">
      <div className="container">
        <h2>Hello, Doctor {props.username}</h2>
        <ViewSlots doctorId={props.doctorId}/>
        <CreateSlot doctorId={props.doctorId}/>
      </div>
    </div>
  );
};
export default DoctorDashboard;