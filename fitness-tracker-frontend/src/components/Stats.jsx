import React, { useEffect, useState } from 'react';
import api from '../api';

function Stats() {
  const [topExercises, setTopExercises] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/workouts/stats')
      .then(res => setTopExercises(res.data))
      .catch(() => setError('❌ Gabim në marrjen e statistikave.'));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🏋️ Top 5 Ushtrimet</h1>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {topExercises.length === 0 ? (
        <p className="text-center text-gray-500">Nuk ka statistika për momentin.</p>
      ) : (
        <ul className="space-y-4">
          {topExercises.map((exercise, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div className="text-lg font-medium text-gray-800">
                #{index + 1} - {exercise.name}
              </div>
              <span className="text-blue-600 font-semibold">
                {exercise.count} herë
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Stats;
