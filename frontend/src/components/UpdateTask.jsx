import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(`${API_URL}/task/${id}`, getAuthConfig());
        if (res.data && res.data.success && res.data.data) {
          setTaskData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    getTask();
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_URL}/update/${id}`,
        taskData,
        getAuthConfig()
      );
      if (res.data && res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-sky-600 hover:underline">
        ← Back
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">
        Update task
      </h1>

      <form className="mt-6 max-w-lg space-y-4" onSubmit={handleUpdateTask}>
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
            value={taskData.title || ""}
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
            value={taskData.description || ""}
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
        >
          Update
        </button>
      </form>
    </main>
  );
};

export default UpdateTask;
