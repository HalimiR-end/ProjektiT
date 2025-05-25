import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';


function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [exercise, setExercise] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

  useEffect(() => {
    api.get(`/workouts/${id}`).then(res => setWorkout(res.data));
  }, [id]);

  const addExercise = async () => {
    try {
      const res = await api.post(`/workouts/${id}/exercises`, {
        name: exercise,
        muscleGroup: muscleGroup,
        reps: 0,
        sets: 0
      });

      setWorkout(prev => ({
        ...prev,
        exercises: [...prev.exercises, res.data],
      }));

      setExercise('');
      setMuscleGroup('');
    } catch (err) {
      console.error('Gabim gjatë shtimit të ushtrimit:', err);
    }
  };

  const deleteExercise = async (exerciseId) => {
    await api.delete(`/workouts/${id}/exercises/${exerciseId}`);
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(e => e.id !== exerciseId),
    }));
  };

  if (!workout)
    return <div className="text-center text-gray-600 py-10">Loading workout...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{workout.name}</h2>
      <p className="text-gray-600 mb-6">{workout.description}</p>

      <MuscleMap />

      <div className="space-y-4 mt-6">
        {workout.exercises.map(ex => (
          <div key={ex.id} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{ex.name}</span>
              <button
                onClick={() => deleteExercise(ex.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑 Fshij
              </button>
            </div>
            {ex.muscleGroup && (
              <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <img src={muscleImage} alt="muscle icon" className="w-4 h-4" />
                {ex.muscleGroup}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Shto ushtrim"
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center gap-2">
          <img src={muscleImage} alt="muscle icon" className="w-6 h-6" />
          <input
            type="text"
            placeholder="Grupi i muskujve (p.sh. Krah, Shpinë)"
            className="w-full border p-2 rounded"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
          />
        </div>
        <button
          onClick={addExercise}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
        >
          ➕ Shto Ushtrim
        </button>
      </div>
    </div>
  );
}

export default WorkoutDetail;
