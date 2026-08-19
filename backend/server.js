import "dotenv/config";
import express from "express";
import { connection, CollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET || "secretkey123";

// Middleware to verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const db = await connection();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const result = await usersCollection.insertOne({ name, email, password });
    const token = jwt.sign({ email, id: result.insertedId }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(201).json({
      message: "Signup successful",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

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
    const result = await collection.insertOne(req.body);
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
    const result = await collection.find().toArray();
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
    const db = await connection();
    const collection = db.collection(CollectionName);
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid task IDs" });
    }
    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await collection.deleteMany({ _id: { $in: objectIds } });
    return res.status(200).json({
      message: "Selected tasks deleted successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection().then(() => console.log("MongoDB connected"));
