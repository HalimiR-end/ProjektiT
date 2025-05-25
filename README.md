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

-- 1. Krijo databazën
CREATE DATABASE IF NOT EXISTS fitnessdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE fitnessdb;

-- 2. Tabela Users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordhash TEXT NOT NULL
);

-- 3. Tabela Workouts
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Tabela WorkoutEntries
CREATE TABLE workoutentries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise VARCHAR(100) NOT NULL,
    reps INT DEFAULT 0,
    sets INT DEFAULT 0,
    musclegroup VARCHAR(100),
    workoutid INT NOT NULL,
    FOREIGN KEY (workoutid) REFERENCES workouts(id) ON DELETE CASCADE
);

-- 5. Tabela WeeklyPlans (nëse e përdorni për planifikim javor)
CREATE TABLE weeklyplans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(20) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    notes TEXT,
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Të dhëna testuese
INSERT INTO users (username, email, passwordhash)
VALUES ('testuser', 'test@example.com', '$2a$11$123456789012345678901u8M9BpoT3uIJ3DUJ6tY');

INSERT INTO workouts (name, description, date, userid)
VALUES ('Morning Workout', 'A light session to start the day', NOW(), 1);

INSERT INTO workoutentries (exercise, reps, sets, musclegroup, workoutid)
VALUES ('Push-ups', 15, 3, 'Chest', 1);

