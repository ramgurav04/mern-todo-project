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

## ☁️ Deploy to Vercel

This app is split into two independent Vercel projects.

### Deploy the Backend

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import your repo and set the **Root Directory** to `backend`.
4. Add the following **Environment Variables** in the Vercel dashboard:

   | Variable       | Value |
   |----------------|-------|
   | `DB_URL`       | Your MongoDB Atlas connection string |
   | `JWT_SECRET`   | A long random secret string |
   | `FRONTEND_URL` | Your frontend Vercel URL (set after deploying frontend) |

5. Click **Deploy**. Note the deployed URL (e.g. `https://mern-todo-backend.vercel.app`).

### Deploy the Frontend

1. Go to [vercel.com](https://vercel.com) → **Add New Project**.
2. Import the same repo and set the **Root Directory** to `frontend`.
3. Add the following **Environment Variable**:

   | Variable       | Value |
   |----------------|-------|
   | `VITE_API_URL` | Your backend Vercel URL from the step above |

4. Click **Deploy**.
5. Copy the frontend URL and go **back to the backend project** → Settings → Environment Variables → update `FRONTEND_URL` → **Redeploy** the backend.

> **Tip:** Vercel auto-detects Vite for the frontend — no custom build command needed.

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
