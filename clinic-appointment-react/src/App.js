import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import SetSchedule from './SetSchedule';
import ViewSlots from './ViewSlots';
import UpdateAppointment from './UpdateAppointment';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          
          <Route path="/set-schedule" element={<SetSchedule />} />
          <Route path="/view-slots" element={<ViewSlots />} />
          <Route path="/update-appointment/:appointment_id" element={<UpdateAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
