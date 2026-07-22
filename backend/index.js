import e from "express";
const app = e();      
app.use(e.json());

app.post("/addtask", (req, res) => {
  const { task } = req.body;
  console.log(task);
  res.send("Task added successfully");
});

app.listen (3200);