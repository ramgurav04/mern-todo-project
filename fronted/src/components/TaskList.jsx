import { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul className="space-y-3">
        {taskData && taskData.length > 0 ? (
          taskData.map((item, idx) => (
            <li
              key={item._id || idx}
              className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-white"
            >
              <div>
                <span className="font-semibold text-gray-700 mr-2">{idx + 1}.</span>
                <span className="font-bold">{item.title}</span>
                {item.description && (
                  <p className="text-gray-600 text-sm ml-5">{item.description}</p>
                )}
              </div>
              {item._id && (
                <button
                  onClick={() => deleteTask(item._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
