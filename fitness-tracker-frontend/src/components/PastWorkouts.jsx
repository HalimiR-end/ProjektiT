import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function PastWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/workout')
      .then(res => setWorkouts(res.data))
      .catch(err => setError('❌ ' + (err.response?.data || err.message)));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">📅 Workout-et e kaluara</h2>
      {error && <p className="text-red-600">{error}</p>}
      {workouts.length === 0 ? (
        <p className="text-gray-600 text-center">Nuk ka ende workout-e të kaluara.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {workouts.map(w => (
            <li key={w.id} className="py-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{w.name}</h3>
                <p className="text-sm text-gray-500">{new Date(w.date).toLocaleDateString()}</p>
              </div>
              <Link to={`/workout/${w.id}`} className="text-blue-500 hover:underline">Shiko</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PastWorkouts;
