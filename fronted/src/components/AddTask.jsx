import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = "http://localhost:3000";

const AddTask = () => {
  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    setSaving(true);

    try {
      const res = await axios.post(`${API_URL}/add-task`, taskData);

      if (res.data && res.data.success) {
        setStatus({ type: "success", text: res.data.message || "Task added successfully" });
        setTaskData({ title: "", description: "" });
      } else {
        setStatus({
          type: "error",
          text: res.data?.message || "Failed to add task",
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err.response?.data?.message ||
          (err.code === "ERR_NETWORK"
            ? "Cannot reach the server. Start the backend (npm start in backend folder, port 3000)."
            : err.message || "Something went wrong"),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm text-sky-600 hover:underline">
        ← Back
      </Link>

      <h1 className="mt-4 text-2xl font-semibold text-slate-900">Add task</h1>

      {status.text && (
        <p
          className={`mt-4 rounded-md px-3 py-2 text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
          role="alert"
        >
          {status.text}
        </p>
      )}

      <form className="mt-6 max-w-lg space-y-4" onSubmit={handleAddTask}>
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
          disabled={saving}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>
    </main>
  );
};

export default AddTask;
