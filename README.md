 Fitness Tracker Frontend
This is the frontend interface for the Fitness Tracker application, built using React, Vite, and Tailwind CSS.
It allows users to log in, track workouts, create plans, and view progress in a responsive dark-themed UI.

🚀 Technologies Used
⚛️ React (with Hooks & Router)

⚡ Vite for fast development

🎨 Tailwind CSS for styling

🔒 Axios for HTTP requests with JWT auth

🌐 Backend API: .NET + MySQL (must be running locally)

🛠️ Getting Started
✅ Prerequisites
Make sure the following tools are installed:

Node.js (v18+)

npm or Yarn

The backend API must run at http://localhost:5230

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/fitness-tracker-frontend.git
cd fitness-tracker-frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
App will be available at: http://localhost:5173

⚙️ Proxy Setup
The Vite dev server proxies API requests to the backend using this config:

js
Copy
Edit
// vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:5230'
  }
}
Make sure the backend is running on port 5230.

📁 Project Structure
css
Copy
Edit
src/
├── api.js
├── App.jsx
├── main.jsx
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── CreateWorkout.jsx
│   ├── WorkoutDetail.jsx
│   ├── WeeklyPlan.jsx
│   └── Stats.jsx
📌 Notes for Collaborators
Make sure to use dark UI and maintain responsive design.

All components should be located in /src/components.

Avoid changing backend endpoints unless necessary.

You can use custom SVGs or icons, but store them in src/assets.s
