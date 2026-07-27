import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      if (response.data && response.data.success) {
        setTaskData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
      if (response.data && response.data.success) {
        getListData();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const updateTask = async (id) => {
    
    console.log("Update task with ID:", id);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-2xl font-bold mb-6">Task List</h1>
  
  {/* Header */}
  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-t-md font-semibold text-gray-700">
    <div className="col-span-1">Sr No.</div>
    <div className="col-span-3">Task Title</div>
    <div className="col-span-5">Task Description</div>
    <div className="col-span-3 text-right">Action</div>
  </div>

  {/* Body */}
  <ul className="space-y-2">
    {taskData && taskData.length > 0 ? (
      taskData.map((item, idx) => (
        <li
          key={item._id || idx}
          className="grid grid-cols-12 gap-4 items-center p-4 border rounded-md shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <div className="col-span-1 font-semibold text-gray-700">{idx + 1}.</div>
          <div className="col-span-3 font-bold text-gray-800 break-words">{item.title}</div>
          <div className="col-span-5 text-gray-600 break-words">
            {item.description || '-'}
          </div>
          <div className="col-span-3 flex justify-end gap-2">
            {item._id && (
              <>
               <Link to={"update/"+item._id} >Update</Link>
                <button
                  onClick={() => deleteTask(item._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))
    ) : (
      <li className="p-8 text-center text-gray-500 border rounded-b-md bg-gray-50">
        No tasks found.
      </li>
    )}
  </ul>
</div>
  );
};

export default TaskList;
