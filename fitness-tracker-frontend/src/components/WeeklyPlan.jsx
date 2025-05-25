import React, { useEffect, useState } from 'react';
import api from '../api';

const days = ['E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë', 'E Diel'];

function WeeklyPlan() {
  const [plan, setPlan] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/weekly-plan')
      .then(res => setPlan(res.data))
      .catch(() => setPlan({}))
      .finally(() => setLoading(false));
  }, []);

  const updateDay = async (day, value) => {
    const newPlan = { ...plan, [day]: value };
    setPlan(newPlan);

    try {
      await api.post('/weekly-plan', newPlan);
    } catch {
      alert('❌ Dështoi ruajtja.');
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-600">Duke ngarkuar planin...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📅 Plani Javor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {days.map((day) => (
          <div key={day} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{day}</h2>
            <textarea
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shkruaj ushtrimet për këtë ditë..."
              rows={3}
              value={plan[day] || ''}
              onChange={(e) => updateDay(day, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyPlan;
