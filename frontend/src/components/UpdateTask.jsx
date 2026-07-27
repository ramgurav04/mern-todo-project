import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState();
  
  const navigate = useNavigate();
  const handleAddTask = async () => {
    let response = await axios.get("http://localhost:3000/tasks",{
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
    });

response = await response
.json();

if(response){
    navigate("/");
    console.log(taskData);
    
}
  }

  return(
    <>
      <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={(e) => {
              setTaskData({ ...taskData, title: e.target.value });
            }}
            placeholder="Task title"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={taskData.description}
            onChange={(e) => {
              setTaskData({ ...taskData, description: e.target.value });
            }}
            placeholder="Optional description"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>
        <button onClick={()=>{
          handleAddTask()
        }}>Update Task</button>
    </>
  )
};

export default UpdateTask;
