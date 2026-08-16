import "dotenv/config";
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
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/task/:id", async (req, res) => {
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

app.put("/update/:id", async (req, res) => {
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

app.delete("/tasks/:id", async (req, res) => {
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

app.post("/delete-tasks", async (req, res) => {
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
