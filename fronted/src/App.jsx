import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddTask from "./components/AddTask";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Task list</h1>} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </>
  );
};

export default App;
