import React, { useState } from 'react';
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/signin', { email, password });
      console.log(response.data);
      // Handle successful signin
    } catch (error) {
      console.error(error);
      // Handle signin error
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};



export default Signin;