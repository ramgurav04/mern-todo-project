import express from "express";
import { add_task, signup } from "../controllers/taskcontroller.js";
import { verifyToken } from "../middleware/auth.js";

const t_router = express.Router();

// POST /signup
t_router.post("/signup", signup);

// POST /add-task  (protected)
t_router.post("/add-task", verifyToken, add_task);

export default t_router;
