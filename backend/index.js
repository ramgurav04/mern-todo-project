import e from "express";

const app = e();      


app.get('/',(req,res)=>{
    res.send("To do App")
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})