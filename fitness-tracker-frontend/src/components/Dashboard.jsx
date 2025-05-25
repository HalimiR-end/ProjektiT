import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">📊 Your Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-[#161B22] rounded-lg shadow p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🏃‍♂️ Active Today</h3>
          <p className="text-gray-400">You’ve logged 2 workouts</p>
        </div>
        <div className="bg-[#161B22] rounded-lg shadow p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">🔥 Calories Burned</h3>
          <p className="text-gray-400">Approx. 450 kcal</p>
        </div>
        <div className="bg-[#161B22] rounded-lg shadow p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">💧 Water Intake</h3>
          <p className="text-gray-400">1.8L / 3L goal</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/create-workout"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded mt-4"
        >
          ➕ Log a New Workout
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
