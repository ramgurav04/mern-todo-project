import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      if (response.data && response.data.success) {
        setTaskData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`);
      if (response.data && response.data.success) {
        setSelectedTask((prev) => prev.filter((itemId) => itemId !== id));
        getListData();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const deleteSelectedTasks = async () => {
    if (selectedTask.length === 0) return;
    try {
      const response = await axios.post(`${API_URL}/delete-tasks`, {
        ids: selectedTask,
      });
      if (response.data && response.data.success) {
        setSelectedTask([]);
        getListData();
      }
    } catch (error) {
      console.error("Error deleting selected tasks:", error);
    }
  };

  const selectall = (e) => {
    if (e.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleiteam = (id) => {
    if (selectedTask.includes(id)) {
      setSelectedTask(selectedTask.filter((itemId) => itemId !== id));
    } else {
      setSelectedTask([...selectedTask, id]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task List</h1>
        {selectedTask.length > 0 && (
          <button
            onClick={deleteSelectedTasks}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
          >
            Delete Selected ({selectedTask.length})
          </button>
        )}
      </div>

      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 rounded-t-md font-semibold text-gray-700">
        <div className="col-span-1">
          <input
            onChange={selectall}
            checked={
              taskData.length > 0 && selectedTask.length === taskData.length
            }
            type="checkbox"
          />
        </div>
        <div className="col-span-1">Sr No.</div>
        <div className="col-span-3">Task Title</div>
        <div className="col-span-4">Task Description</div>
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
              <div className="col-span-1">
                <input
                  onChange={() => selectSingleiteam(item._id)}
                  checked={selectedTask.includes(item._id)}
                  type="checkbox"
                />
              </div>
              <div className="col-span-1 font-semibold text-gray-700">
                {idx + 1}.
              </div>
              <div className="col-span-3 font-bold text-gray-800 break-words">
                {item.title}
              </div>
              <div className="col-span-4 text-gray-600 break-words">
                {item.description || "-"}
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                {item._id && (
                  <>
                    <Link
                      to={`/update/${item._id}`}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </Link>
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
