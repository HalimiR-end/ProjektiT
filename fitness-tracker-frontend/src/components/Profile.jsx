import React, { useEffect, useState } from 'react';
import api from '../api';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/auth/profile')

      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        setError("❌ Gabim: " + (err.response?.data || err.message));
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!user) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 {user.username}</h2>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
        <button
          onClick={logout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
