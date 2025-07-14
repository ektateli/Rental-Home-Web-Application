import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Invalid email address');
      return false;
    }
    if (form.password.length < 5) {
      setError('Password must be at least 5 characters');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/api/signup', form);
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
  if (err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message); // show exact backend message
  } else {
    setError('Signup failed. Please try again.');
  }
}
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="tenant">I'm a Tenant</option>
            <option value="owner">I'm an Owner</option>
          </select>
          <button type="submit">Sign Up</button>
          {error && <p className="message error">{error}</p>}
          {message && <p className="message success">{message}</p>}
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
