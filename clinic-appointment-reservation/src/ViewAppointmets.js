import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState(props.patientName);
  const [editableAppointmentId, setEditableAppointmentId] = useState('');
  const [editableAppointment, setEditableAppointment] = useState({ date: '', hour: '', doctor_name:'' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/patient/appointments/${patientName}`);
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // Handle fetch appointments error
      setLoading(false);
    }
  };

  const handleCancel = async (appointment_id) => {
    try {
      // Delete the slot from the database
      await axios.delete(`/patient/delete/${appointment_id}`);

      // Fetch the updated slots
      fetchAppointments();

      // Handle successful cancellation
    } catch (error) {
      console.error(error);
      // Handle cancellation error
    }
  };

  const handleEdit = (appointment_id) => {
    const appointmentToEdit = appointments.find((appointment) => appointment['appointment_number'] === appointment_id);
    setEditableAppointmentId(appointment_id);
    setEditableAppointment(appointmentToEdit);
  };

  const handleSave = async (appointment_id, updatedAppointments) => {
    try {
      console.log(updatedAppointments)
      // Update the slot in the database
      const response = await axios.put(`/patient/edit/${patientName}/${appointment_id}`, updatedAppointments);
      console.log(response.data)

      // Fetch the updated slots
      fetchAppointments();

      // Handle successful save
    } catch (error) {
      console.error(error);
      // Handle save error
    }
  };
  
  return (
    <div className="view-appointments">
      <div className='container'>
        <h2>View appointments</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hour</th>
                <th>Doctor name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment['appointment_number']}>
                  <td>
                    {editableAppointmentId === appointment['appointment_number'] ? (
                      <input
                        type="text"
                        value={editableAppointment.date}
                        onChange={(e) =>
                          setEditableAppointment({ ...editableAppointment, date: e.target.value })
                        }
                      />
                    ) : (
                      appointment.date
                    )}
                  </td>
                  <td>
                    {editableAppointmentId === appointment['appointment_number'] ? (
                      <input
                        type="text"
                        value={editableAppointment.hour}
                        onChange={(e) =>
                          setEditableAppointment({ ...editableAppointment, hour: e.target.value })
                        }
                      />
                    ) : (
                      appointment.hour
                    )}
                  </td>
                  <td>
                    {editableAppointmentId === appointment['appointment_number'] ? (
                      <input
                        type="text"
                        value={editableAppointment.doctor_name}
                        onChange={(e) =>
                          setEditableAppointment({ ...editableAppointment, doctor_name: e.target.value })
                        }
                      />
                    ) : (
                      appointment.doctor_name
                    )}
                  </td>
                  <td>
                    {editableAppointmentId === appointment['appointment_number'] ? (
                      <>
                        <button onClick={() => handleSave(appointment['appointment_number'], editableAppointmentId)}>Save</button>
                        <button onClick={() => setEditableAppointmentId('')}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(editableAppointmentId)}>Edit</button>
                    )}
                    <button onClick={() => handleCancel(patientName, editableAppointmentId)}>Cancel appointment</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments available</p>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
