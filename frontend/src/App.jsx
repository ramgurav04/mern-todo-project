import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import UpdateTask from "./components/UpdateTask.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks" element ={<TaskList/>}/>
        <Route path="/update/:id" element={<UpdateTask />}/>
      </Routes>
    </div>
  );
};

export default App;
