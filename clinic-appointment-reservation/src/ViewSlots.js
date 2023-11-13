import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSlots = (props) => {
  const [slots, setSlots] = useState([]);
  const [doctorId, setDoctorId] = useState(props.doctorId);
  const [editableSlotId, setEditableSlotId] = useState('');
  const [editableSlot, setEditableSlot] = useState({ date: '', hour: '' });

  useEffect(() => {
    fetchSlots();
  }, [slots]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`/doctors/slots/${doctorId}`);
      setSlots(response.data.slots);
    } catch (error) {
      console.error(error);
      // Handle fetch slots error
    }
  };

  const handleCancel = async (doctorId, slotId) => {
    try {
      // Delete the slot from the database
      await axios.delete(`doctors/delete/${doctorId}/${slotId}`);

      // Remove the slot from the slots array
      const updatedSlots = slots.filter((slot) => slot['slot-id'] !== slotId);
      setSlots(updatedSlots);

      // Handle successful cancellation
    } catch (error) {
      console.error(error);
      // Handle cancellation error
    }
  };

  const handleEdit = (slotId) => {
    const slotToEdit = slots.find((slot) => slot['slot-id'] === slotId);
    setEditableSlotId(slotId);
    setEditableSlot(slotToEdit);
  };

  const handleSave = async (slotId, updatedSlot) => {
    try {
      // Update the slot in the database
      await axios.put(`/doctors/edit/${doctorId}/${slotId}`, updatedSlot);

      // Update the slots array with the updated slot
      const updatedSlots = slots.map((slot) => {
        if (slot['slot-id'] === slotId) {
          return { ...slot, ...updatedSlot };
        }
        return slot;
      });
      setSlots(updatedSlots);

      // Clear the editable slot ID and slot data
      setEditableSlotId('');
      setEditableSlot({ date: '', hour: '' });

      // Handle successful save
    } catch (error) {
      console.error(error);
      // Handle save error
    }
  };

  return (
    <div className="view">
      <div className='container'>
        <h2>View Slots</h2>

        {typeof slots == Array && slots.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hour</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot['slot-id']}>
                  <td>
                    {editableSlotId === slot['slot-id'] ? (
                      <input
                        type="text"
                        value={editableSlot.date}
                        onChange={(e) =>
                          setEditableSlot({ ...editableSlot, date: e.target.value })
                        }
                      />
                    ) : (
                      slot.date
                    )}
                  </td>
                  <td>
                    {editableSlotId === slot['slot-id'] ? (
                      <input
                        type="text"
                        value={editableSlot.hour}
                        onChange={(e) =>
                          setEditableSlot({ ...editableSlot, hour: e.target.value })
                        }
                      />
                    ) : (
                      slot.hour
                    )}
                  </td>
                  <td>
                    {editableSlotId === slot['slot-id'] ? (
                      <>
                        <button onClick={() => handleSave(slot['slot-id'], editableSlot)}>Save</button>
                        <button onClick={() => setEditableSlotId('')}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={() => handleEdit(slot['slot-id'])}>Edit</button>
                    )}
                    <button onClick={() => handleCancel(doctorId, slot['slot-id'])}>Cancel Slot</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No slots available</p>
        )}
      </div>
    </div>
  );
};

export default ViewSlots;
