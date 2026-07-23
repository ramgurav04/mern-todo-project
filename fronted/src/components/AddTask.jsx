// import React from "react";

const AddTask = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-2xl font-semibold text-white sm:text-3xl">
          Add New Task
        </h1>
        <form className="max-w-xl space-y-5 rounded-xl border border-slate-700/60 bg-slate-900/95 p-6 shadow-lg shadow-slate-950/40">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter task title..."
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-300"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Enter task description..."
              className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-400 sm:w-auto"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
