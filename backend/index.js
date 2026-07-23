import e from "express";
import { connection, CollectionName } from "./dbconfig.js";
const app = e();
app.use(e.json());

app.post("/add-task", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(CollectionName);
  const result = await collection.insertOne(req.body);
  if(result){
    res.send({ message: "Task added successfully", success: true });
  } else {
    res.send({ message: "Failed to add task", success: false });
  }
});

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
