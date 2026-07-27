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

app.put("/update/:id", async (req, res) => {
  try {
    const db = await connection();
    const collection = db.collection(CollectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    return res.status(200).json({
      message: "Task updated successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("PUT /update/:id error:", err);
    return res.status(500).json({
      message: err.message || "Failed to update task",
      success: false,
    });
  }
})

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connection()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
