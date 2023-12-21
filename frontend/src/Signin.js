import React, { useState } from 'react';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role , setRole] = useState('')
  const [signinError, setSigninError] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [username, serUsername] = useState('');


  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/signin', { email, password });
      console.log(response.data);
      setRole(response.data.role)
      setDoctorId(response.data.doctorId);
      serUsername(response.data.username)
    } catch (error) {
      console.error(error);
      setSigninError('Failed to sign in. Please try again.');
    }
  };

  if (role == "doctor") {
    return <DoctorDashboard username={username} doctorId={doctorId} />;
  }
  else if (role == "patient"){
    return <PatientDashboard patientName={username} />;
  }

  return (
    <div className='signin'>
      <div className="container">
        <h2>Sign In</h2>
        <form className="signin-form" onSubmit={handleSignin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign In</button>
        </form>
        {signinError && <p>{signinError}</p>}
      </div>
    </div>
  );
};

export default Signin;
