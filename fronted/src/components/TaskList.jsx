import { Link } from "react-router-dom";

const TaskList = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">Tasks</h1>
      <p className="mt-2 text-slate-600">You have no tasks yet.</p>
      <Link
        to="/add"
        className="mt-6 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
      >
        Add your first task
      </Link>
    </main>
  );
};

export default TaskList;
