import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    api.get('/workouts')
      .then(res => setWorkouts(res.data))
      .catch(err => console.error('Gabim në marrjen e ushtrimeve:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Lista e Ushtrimeve</h1>

      {workouts.length === 0 ? (
        <div className="text-gray-600 text-center">Nuk ka ushtrime për momentin.</div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{workout.name}</h2>
                <p className="text-sm text-gray-600">{workout.description}</p>
              </div>
              <Link
                to={`/workout/${workout.id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                Shiko Detajet →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
