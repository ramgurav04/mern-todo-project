import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks" element ={<TaskList/>}/>
      </Routes>
    </div>
  );
};

export default App;
