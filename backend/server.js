import "dotenv/config";
import express from "express";
import { connection, CollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.js";
import t_router from "./routes/taskroutes.js";

const app = express();

app.use(express.json());
app.use(cors());



const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

app.use("/signup", t_router);

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const db = await connection();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Protected Task Routes
app.post("/add-task", verifyToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.insertOne({ ...req.body, userId: req.user.id });
    return res.status(201).json({
      message: "Task added successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/tasks", verifyToken, async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.find({ userId: req.user.id }).toArray();
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/task/:id", verifyToken, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!result) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    return res.status(200).json({
      message: "Task retrieved successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/update/:id", verifyToken, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    const db = await connection();
    const collection = db.collection(CollectionName);
    const { _id, ...fields } = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: fields }
    );
    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/tasks/:id", verifyToken, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid task ID" });
    }
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    return res.status(200).json({
      message: "Task deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});


app.post("/delete-tasks", verifyToken, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No task IDs provided" });
    }
    const db = await connection();
    const collection = db.collection(CollectionName);
    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await collection.deleteMany({ _id: { $in: objectIds } });
    return res.status(200).json({
      message: "Tasks deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.use("/tasks", t_router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection().then(() => console.log("MongoDB connected"));
