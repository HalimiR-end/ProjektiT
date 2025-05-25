import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function CreateWorkout() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workouts', { name, description });
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating workout', err);
    }
  };

  return (
    <div className="text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">📝 Create a New Workout</h2>
      <form onSubmit={handleSubmit} className="bg-[#161B22] p-6 rounded-lg shadow space-y-4">
        <input
          type="text"
          placeholder="Workout Name"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded"
        >
          💪 Create Workout
        </button>
      </form>
    </div>
  );
}

export default CreateWorkout;
