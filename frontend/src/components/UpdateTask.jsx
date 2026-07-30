// import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const handelUpdateTask = () => {
    e.PreventDefault()
    console.log("In update");
    
  };
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="text-sm text-sky-600 hover:underline">
          ← Back
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-slate-900">
          Update task
        </h1>

        <form className="mt-6 max-w-lg space-y-4" onSubmit={(e)=>{
          handelUpdateTask(e)
        }}>
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
          <button
            type="submit"
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
          >Update</button>
        </form>
      </main>
    </>
  );
};

export default UpdateTask;
