import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup'; // Update the import to use the correct component name
import Signin from './Signin'; // Update the import to use the correct component name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
