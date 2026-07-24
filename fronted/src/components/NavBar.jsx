import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  isActive
    ? "text-sky-600 font-medium"
    : "text-slate-600 hover:text-slate-900";

const NavBar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Todo App
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-sky-600 px-3 py-1.5 font-medium text-white"
                  : "rounded-md bg-sky-600 px-3 py-1.5 font-medium text-white hover:bg-sky-700"
              }
            >
              Add Task
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
