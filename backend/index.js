import e from "express";
import { connection, CollectionName } from "./dbconfig.js";
import cors from "cors";

const app = e();

app.use(e.json());
app.use(cors());

app.post("/add-task", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.insertOne(req.body);
  if(result){
    console.log("Task added successfully");
  }
  else{
    console.log("Failed to add task");
  }
});

app.get("/tasks", async (req, res) => {
  const db = await connection();
  const collection = db.collection(CollectionName);
  const result = await collection.find().toArray();
  
  if(result){
    console.log("Works");
    
  }
  else{
    console.log("not works");
    
  }
});


// app.post("/add-task", async (req, res) => {
//   try {
//     if (!title || !String(title).trim()) {
//       return res.status(400).json({
//         message: "Title is required",
//         success: false,
//       });
//     }

//     const db = await connection();
//     const collection = db.collection(CollectionName);
//     const result = await collection.insertOne({
//       title: String(title).trim(),
//       description: description ? String(description).trim() : "",
//     });

//     if (result.acknowledged) {
//       return res.status(201).json({
//         message: "Task added successfully",
//         success: true,
//       });
//     }

//     return res.status(500).json({
//       message: "Failed to add task",
//       success: false,
//     });
//   } catch (err) {
//     console.error("POST /add-task:", err);
//     return res.status(500).json({
//       message: err.message || "Server error",
//       success: false,
//     });
//   }
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const db = await connection();
//     const collection = db.collection(CollectionName);
//     const result = await collection.find({}).toArray();
//     return res.status(200).json({
//       message: "Tasks fetched successfully",
//       success: true,
//       data: result,
//     });
//   } catch (err) {
//     console.error("GET /tasks:", err);
//     return res.status(500).json({
//       message: err.message || "Server error",
//       success: false,
//     });
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const db = await connection();
//     const collection = db.collection(CollectionName);
//     const result = await collection.deleteOne({ _id: new ObjectId(id) });
//     return res.status(200).json({
//       message: "Task deleted successfully",
//       success: true,
//       data: result,
//     });
//   } catch (err) {
//     console.error("DELETE /tasks/:id:", err);
//     return res.status(500).json({
//       message: err.message || "Server error",
//       success: false,
//     });
//   }
// });

// app.put("/tasks/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description } = req.body ?? {};
//     const db = await connection();
//     const collection = db.collection(CollectionName);
//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         $set: {
//           title: String(title).trim(),
//           description: description ? String(description).trim() : "",
//         },
//       },
//     );
//     return res.status(200).json({
//       message: "Task updated successfully",
//       success: true,
//       data: result,
//     });
//   } catch (err) {
//     console.error("PUT /tasks/:id:", err);
//     return res.status(500).json({
//       message: err.message || "Server error",
//       success: false,
//     });
//   }
// });

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connection()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));
