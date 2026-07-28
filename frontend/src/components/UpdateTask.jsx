import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react"

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTask = async () => {
      try {
        // GET request to fetch existing task details
        let response = await axios.get(`http://localhost:3000/task/${id}`);
        setTaskData(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (id) {
      getTask();
    }
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      // PUT request to update task details
      let response = await axios.put(
        `http://localhost:3000/update/task/${id}`,
        {
          title: taskData.title,
          description: taskData.description,
        }
      );

      // Check success safely inside response object
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error updating task:", err?.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">Update Task</h2>

      <form onSubmit={handleUpdateTask} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title || ""}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            placeholder="Task title"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={taskData.description || ""}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            placeholder="Optional description"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors shadow-sm"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;