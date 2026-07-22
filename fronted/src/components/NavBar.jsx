// import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="flex justify-between bg-gray-800 font-bold text-white p-2.5 text-4xl">To Do App
      <ul className="flex justify-between text-white gap-3 text-2xl gap-3">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"add"}>Add Task</Link>
        </li>
      </ul>
      </div>
    </>
  );
};

export default NavBar;
