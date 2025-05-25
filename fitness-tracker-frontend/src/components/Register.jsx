import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password });
      setMessage('✅ Registration successful! You can now log in.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage('❌ Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-white">
      <div className="bg-[#161B22] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-orange-400 text-center">Create Your Account 🚀</h2>
        {message && <p className="text-center text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold"
          >
            📝 Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
