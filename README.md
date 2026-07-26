# MERN Todo Application

A full-stack Todo application built with the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact, **N**ode.js).

## 🚀 Features

- **View Tasks**: Fetch and display all active tasks from MongoDB.
- **Add Task**: Create new tasks with title and optional description.
- **Delete Task**: Remove completed or unwanted tasks from the database.
- **Responsive UI**: Clean user interface built with React, React Router, and Tailwind CSS.
- **RESTful API**: Clean backend architecture using Express and MongoDB Native Driver.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **HTTP Client**: Axios
- **Routing**: React Router DOM (`v7`)
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js (`v5`)
- **Database**: MongoDB Atlas (`mongodb` Native Driver)
- **CORS Middleware**: `cors`

---

## 📁 Project Structure

```text
mern-todo-app/
├── backend/
│   ├── dbconfig.js       # MongoDB Atlas configuration & connection
│   ├── server.js         # Express server & API routes
│   └── package.json      # Backend dependencies & scripts
├── fronted/
│   ├── src/
│   │   ├── assets/       # Static assets
│   │   ├── components/   # React components (NavBar, TaskList, AddTask)
│   │   ├── App.jsx       # Main app component & routes
│   │   ├── main.jsx      # Entry point & BrowserRouter wrapper
│   │   └── index.css     # Global styles & Tailwind import
│   ├── package.json      # Frontend dependencies & scripts
│   └── vite.config.js    # Vite configuration
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Home page health check | None |
| `GET` | `/tasks` | Get all tasks | None |
| `POST` | `/add-task` | Add a new task | `{ "title": "string", "description": "string" }` |
| `DELETE` | `/tasks/:id` | Delete task by ID | None |

---

## ⚙️ Getting Started

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

---

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```
> The backend server will start on **`http://localhost:3000`**.

---

### 3. Setup Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd fronted

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
> The frontend application will run on **`http://localhost:5173`** (or port specified by Vite).

---

## 📝 License
This project is licensed under the ISC License.
