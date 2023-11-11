import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signup', { username, email, password ,role});
      console.log(response.data);
      // Redirect to another page after successful signup
      navigate('./Signin');
    } catch (error) {
      console.error(error);
      // Handle signup error
    }
  };

  return (
    <div className="signup">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Choose a Role --</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
