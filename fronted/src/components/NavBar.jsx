// import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/60 bg-slate-900/95 backdrop-blur-sm shadow-lg shadow-slate-950/40">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-white transition hover:text-sky-300 sm:text-2xl"
        >
          To Do App
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link
              to="/add"
              className="rounded-lg bg-sky-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-400 sm:text-base"
            >
              Add Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
