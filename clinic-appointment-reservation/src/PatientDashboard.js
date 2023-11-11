import React from 'react';
import ViewAppointments from './ViewAppointmets';
import CreateAppointment from './CreateAppointment';

const PatientDashboard = (props) => {
  return (
    <div className="patient-board">
      <div className="container">
        <h2>Hello, {props.patientName}</h2>
        <ViewAppointments patientName={props.patientName}/>
        <CreateAppointment patientName={props.patientName}/>
      </div>
    </div>
  );
};
export default PatientDashboard;