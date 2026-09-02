import express from "express";
import { add_task, signup } from "../controllers/taskcontroller.js";
import { verifyToken } from "../middleware/auth.js";

const t_router = express.Router();

t_router.post("/", verifyToken, add_task);
t_router.post("/signup", signup);

export default t_router;
