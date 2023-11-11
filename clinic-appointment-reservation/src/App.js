import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;
