import e from "express";
import { connection , collectionName } from "./dbconfig";
const app = e();      
app.use(e.json());

app.post("/add-task", (req, res) => {
   const db = connection();
   const collection = await db.collection("Tasks");
   const result = await collection.insertOne(req.body);
   res.send("Working")
});

app.get('/',(req,res)=>{
    res.send("Home page");
})

app.listen(3200);