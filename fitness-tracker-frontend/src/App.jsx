import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateWorkout from './components/CreateWorkout';
import WorkoutDetail from './components/WorkoutDetail';
import Stats from './components/Stats';
import WeeklyPlan from './components/WeeklyPlan';

function App() {
  return (
    <div className="bg-[#0D1117] min-h-screen text-white font-sans">
      <Router>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-workout" element={<CreateWorkout />} />
            <Route path="/workout/:id" element={<WorkoutDetail />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/weekly-plan" element={<WeeklyPlan />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
