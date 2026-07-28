import express from "express";
import { connection, CollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/add-task", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.insertOne(req.body);
    return res.status(201).json({
      message: "Task added successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("POST /add-task error:", err);
    return res.status(500).json({
      message: err.message || "Failed to add task",
      success: false,
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.find().toArray();
    return res.status(200).json({
      message: "Tasks retrieved successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("GET /tasks error:", err);
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
    });
  }
});

const deleteTaskHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({
      message: "Task deleted successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("DELETE task error:", err);
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
    });
  }
};

app.delete("/tasks/:id", deleteTaskHandler);
app.delete("/delete/:id", deleteTaskHandler);

// 1. GET endpoint to pre-fill the Update form
app.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connection();
    const collection = db.collection(CollectionName);

    const task = await collection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
});

// 2. PUT endpoint to update the task in MongoDB
app.put("/update/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connection();
    const collection = db.collection(CollectionName);

    // Remove _id from request body so MongoDB won't throw an immutable _id error
    const { _id, ...fields } = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: fields }
    );

    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connection()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
