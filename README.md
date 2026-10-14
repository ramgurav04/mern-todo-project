# ✅ MERN Todo App

A full-stack **Todo application** built with the **MERN** stack (MongoDB, Express, React, Node.js). Users can sign up, log in, and manage their personal tasks — add, update, delete, and bulk-delete. Secured with **JWT authentication**.

---

## 🚀 Live Demo

> _Fill in after deploying to Vercel_

| Service  | URL |
|----------|-----|
| Frontend | `https://your-frontend.vercel.app` |
| Backend  | `https://your-backend.vercel.app`  |

---

## 🛠️ Tech Stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, React Router v7 |
| Backend   | Node.js, Express 5, MongoDB (native driver) |
| Auth      | JSON Web Tokens (JWT) |
| Database  | MongoDB Atlas |
| Hosting   | Vercel (frontend + backend as separate projects) |

---

## ✨ Features

- 🔐 **User Auth** — Signup & Login with JWT (token stored in `localStorage`)
- 📋 **Task CRUD** — Create, read, update, delete tasks
- ☑️ **Bulk Delete** — Select multiple tasks and delete in one click
- 🔒 **Protected Routes** — All task operations require a valid JWT
- 📱 **Responsive UI** — Clean Tailwind CSS layout that works on all screen sizes

---

## 📁 Project Structure

```
mern-todo-app/
├── backend/                  # Express API (deploy as separate Vercel project)
│   ├── controllers/
│   │   └── taskcontroller.js # add_task, signup handlers
│   ├── middleware/
│   │   └── auth.js           # JWT verifyToken middleware
│   ├── routes/
│   │   └── taskroutes.js     # /signup, /add-task routes
│   ├── dbconfig.js           # MongoDB connection (singleton)
│   ├── server.js             # Express app entry point
│   ├── vercel.json           # Vercel serverless config
│   ├── .env.example          # Required environment variables
│   └── package.json
│
└── frontend/                 # React + Vite app (deploy as separate Vercel project)
    ├── src/
    │   ├── components/
    │   │   ├── AddTask.jsx
    │   │   ├── Login.jsx
    │   │   ├── NavBar.jsx
    │   │   ├── SignUp.jsx
    │   │   ├── TaskList.jsx
    │   │   └── UpdateTask.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── vercel.json           # SPA rewrite config (React Router support)
    ├── .env.example          # Required environment variables
    └── package.json
```

---

## ⚡ API Endpoints

All task routes require `Authorization: Bearer <token>` header.

| Method | Endpoint        | Auth | Description              |
|--------|-----------------|------|--------------------------|
| POST   | `/signup`       | ❌   | Create a new account     |
| POST   | `/login`        | ❌   | Login, get JWT token     |
| GET    | `/tasks`        | ✅   | Get all tasks for user   |
| GET    | `/task/:id`     | ✅   | Get a single task        |
| POST   | `/add-task`     | ✅   | Create a new task        |
| PUT    | `/update/:id`   | ✅   | Update a task            |
| DELETE | `/tasks/:id`    | ✅   | Delete a single task     |
| POST   | `/delete-tasks` | ✅   | Bulk delete tasks by IDs |

---

## 🖥️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (free tier works)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app
```

### 2. Set up the Backend

```bash
cd backend
npm install

# Copy the example env file and fill in your values
cp .env.example .env
```

Edit `backend/.env`:

```env
DB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/mern?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
PORT=3000
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev   # uses nodemon (hot reload)
# or
npm start     # plain node
```

Backend runs at **http://localhost:3000**

### 3. Set up the Frontend

```bash
cd ../frontend
npm install

# Copy the example env file
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## ☁️ Deploy to Vercel (Multi-Service — One Project, One Domain)

This repo uses **Vercel Services** — both `frontend` and `backend` deploy as a **single Vercel project** sharing one domain. Vercel routes `/api/*` requests to Express and everything else to the Vite SPA.

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: add Vercel multi-service config"
git push
```

### 2. Import into Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
2. Leave **Root Directory** as the repo root (where `vercel.json` lives).
3. Vercel will auto-detect the services from `vercel.json`.

### 3. Set Environment Variables

In the Vercel project → **Settings → Environment Variables**, add:

| Variable     | Value | Notes |
|--------------|-------|-------|
| `DB_URL`     | Your MongoDB Atlas connection string | Backend only |
| `JWT_SECRET` | A long random secret | Backend only |

> `VITE_API_URL` does **not** need to be set in production — the frontend defaults to the relative path `/api` (same domain).
> `FRONTEND_URL` does **not** need to be set for the multi-service deploy — both services share one origin so CORS is same-origin.

### 4. Deploy

Click **Deploy**. That's it — one URL serves both the React app and the API.

```
https://your-app.vercel.app/          → React SPA (frontend service)
https://your-app.vercel.app/api/...   → Express API (backend service)
```

### Local Development

Run services independently:

```bash
# Terminal 1 — backend
cd backend && npm run dev     # http://localhost:3000/api/...

# Terminal 2 — frontend
cd frontend && npm run dev    # http://localhost:5173 (calls localhost:3000/api via VITE_API_URL)
```

---

## 🔒 Security Notes

- **Never commit `.env` files** — they are listed in `.gitignore`.
- Use a strong, random `JWT_SECRET` (e.g. `openssl rand -hex 32`).
- Passwords are stored in plain text in this demo — for production, hash them with **bcrypt**.
- JWT tokens expire in 1 hour.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
