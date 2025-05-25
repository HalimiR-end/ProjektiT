import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#121212] text-white px-6 py-4 shadow-lg flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold tracking-tight text-orange-400">🏋️ FitTrack</h1>
      <div className="space-x-6 text-lg">
        <Link to="/dashboard" className="hover:text-orange-300 transition">Dashboard</Link>
        <Link to="/workouts" className="hover:text-orange-300 transition">Workouts</Link>
        <Link to="/create-workout" className="hover:text-orange-300 transition">Create</Link>
        <Link to="/weekly-plan" className="hover:text-orange-300 transition">Plan</Link>
        <Link to="/stats" className="hover:text-orange-300 transition">Stats</Link>
        <Link to="/profile" className="hover:text-orange-300 transition">Profile</Link>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="text-red-500 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
