import express from "express";
import { connection, CollectionName } from "./dbconfig.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/add-task", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.insertOne(req.body);
  return res.status(201).json({
    message: "Task added successfully",
    success: true,
    data: result,
  });
});

app.get("/tasks", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.find().toArray();
  return res.status(200).json({
    message: "Tasks retrieved successfully",
    success: true,
    data: result,
  });
});

app.get("/task/:id", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  return res.status(200).json({
    message: "Task retrieved successfully",
    success: true,
    data: result,
  });
});

app.put("/update/:id", async (req, res) => {
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
});

app.delete("/tasks/:id", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  return res.status(200).json({
    message: "Task deleted successfully",
    success: true,
    data: result,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connection().then(() => console.log("MongoDB connected"));
