import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState(props.patientName);
  const [editableAppointmentId, setEditableAppointmentId] = useState("");
  const [editableAppointment, setEditableAppointment] = useState({
    date: "",
    hour: "",
    doctor_name: "",
  });
  const [isLoading, setIsLoading] = useState(true);



  const fetchAppointments = () => {
      axios.get(`/patient/appointments/${patientName}`)
      .then((response) => {
        const myAp = response.data.appointments;
        setAppointments(myAp);
        setIsLoading(false); // set loading to false after data is fetched
      });
  };

  useEffect(() => {
    const id = setInterval(() => fetchAppointments(), 500)
    return () => clearInterval(id)
  }, [])

  const handleCancel = async (appointment_id) => {
    try {
      // Delete the slot from the database
      await axios.delete(`/patient/delete/${appointment_id}`);
      const updatedAppointments = appointments.filter(
        (appointment) => appointment["appointment_number"] !== appointment_id
      );
      setAppointments(updatedAppointments);
      // Handle successful cancellation
      fetchAppointments()
    } catch (error) {
      console.error(error);
      // Handle cancellation error
    }
  };

  const handleEdit = (appointment_id) => {
    const appointmentToEdit = appointments.find((appointment) => appointment["appointment_number"] === appointment_id);
    setEditableAppointmentId(appointment_id);
    setEditableAppointment(appointmentToEdit);
  };

  const handleSave = async (appointment_id, updatedAppointment) => {
    try {
      // Update the appointment in the database
      await axios.put(`/patient/edit/${patientName}/${appointment_id}`,updatedAppointment);
      // Update the appointments array with the updated slot
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment["appointment_number"] === appointment_id) {
          return { ...appointment, ...updatedAppointment };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      // Clear the editable slot ID and slot data
      setEditableAppointmentId('');
      setEditableAppointment({ date: '', hour: '',doctor_name:'' });
      // Handle successful save
    } catch (error) {
      console.error(error);
      // Handle save error
    }
  };

  return (
    <div className="view">
      <div className="container">
        <h2>View appointments</h2>
        {isLoading ? (
          <p>Loading...</p> // This will display while the data is being fetched
        ) : (
          appointments.length > 0 ? (
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
                  <tr key={appointment["appointment_number"]}>
                    <td>
                      {editableAppointmentId === appointment["appointment_number"] ? (
                        <input
                          type="text"
                          value={editableAppointment.date}
                          onChange={(e) =>
                            setEditableAppointment({
                              ...editableAppointment,
                              date: e.target.value
                            })
                          }
                        />
                      ) : (
                        appointment.date
                      )}
                    </td>
                    <td>
                      {editableAppointmentId === appointment["appointment_number"] ? (
                        <input
                          type="text"
                          value={editableAppointment.hour}
                          onChange={(e) =>
                            setEditableAppointment({
                              ...editableAppointment,
                              hour: e.target.value
                            })
                          }
                        />
                      ) : (
                        appointment.hour
                      )}
                    </td>
                    <td>
                      {editableAppointmentId === appointment["appointment_number"] ? (
                        <input
                          type="text"
                          value={editableAppointment.doctor_name}
                          onChange={(e) =>
                            setEditableAppointment({
                              ...editableAppointment,
                              doctor_name: e.target.value
                            })
                          }
                        />
                      ) : (
                        appointment.doctor_name
                      )}
                    </td>
                    <td>
                      {editableAppointmentId === appointment["appointment_number"] ? (
                        <>
                          <button onClick={() => handleSave(appointment["appointment_number"], editableAppointment)}>Save</button>
                          <button onClick={() => setEditableAppointmentId('')}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(appointment["appointment_number"])}>Edit</button>
                      )}
                      <button onClick={() => handleCancel(appointment["appointment_number"])}>Cancel appointment</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments available</p>
          )
        )}
      </div>
    </div>
  );
};
export default ViewAppointments;
  
