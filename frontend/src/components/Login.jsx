// import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/" className="text-sm text-sky-600 hover:underline">
          ← Back
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">Login</h1>

        <form className="mt-6 max-w-lg space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
