import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registered. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || JSON.stringify(err.response?.data) || 'Register failed');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div><input placeholder="Name" required value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
        <div><input placeholder="Email" required value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
        <div><input placeholder="Password" type="password" required value={form.password} onChange={e => setForm({...form, password:e.target.value})} /></div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
