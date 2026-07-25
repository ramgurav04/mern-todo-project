import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      if (res.data && res.data.success) {
        setTasks(res.data.data || []);
      } else {
        setError(res.data?.message || "Failed to load tasks.");
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(
        err.code === "ERR_NETWORK"
          ? "Cannot connect to backend server. Make sure node server is running on port 3000."
          : err.message || "Failed to fetch tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setDeletingId(id);
    try {
      const res = await axios.delete(`${API_URL}/tasks/${id}`);
      if (res.data && res.data.success) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        alert(res.data?.message || "Failed to delete task.");
      }
    } catch (err) {
      alert(err.message || "Error deleting task.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Task List</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchTasks}
            disabled={loading}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <Link
            to="/add"
            className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700"
          >
            + Add Task
          </Link>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          <p className="font-semibold">Connection Error</p>
          <p className="mt-1">{error}</p>
          <button
            onClick={fetchTasks}
            className="mt-2 rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {loading && !error && (
        <div className="mt-8 flex justify-center py-8">
          <div className="text-slate-500 text-sm font-medium animate-pulse">
            Loading tasks from server...
          </div>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <div className="mt-8 rounded-lg border-2 border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-500 font-medium">No tasks found.</p>
          <p className="mt-1 text-sm text-slate-400">
            Click "Add Task" to create your first task!
          </p>
          <Link
            to="/add"
            className="mt-4 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Create Task
          </Link>
        </div>
      )}

      {!loading && !error && tasks.length > 0 && (
        <ul className="mt-6 space-y-3">
          {tasks.map((task, idx) => (
            <li
              key={task._id || idx}
              className="flex items-start justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                    {idx + 1}
                  </span>
                  <h2 className="font-semibold text-slate-900">{task.title}</h2>
                </div>
                {task.description && (
                  <p className="pl-8 text-sm text-slate-600 whitespace-pre-line">
                    {task.description}
                  </p>
                )}
              </div>

              {task._id && (
                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={deletingId === task._id}
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                  title="Delete task"
                >
                  {deletingId === task._id ? "Deleting..." : "Delete"}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default TaskList;
