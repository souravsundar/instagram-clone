import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Email.scss';
import axios from 'axios';

function Email() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Please enter an email.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/verifyemail",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        localStorage.setItem('email', email);
        alert(res.data.msg);
        navigate('/login');
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Email">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default Email;
