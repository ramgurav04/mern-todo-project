import { useEffect } from "react";
import { useState } from "react";

const TaskList = () => {
  const [taskData, setTaskData] = useState();

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3000/tasks");
    list = await list.json();
    console.log(list.data);

    if (list.success) setTaskData(list.data);
  };

  return (
    <>
      <ul>
        
        {taskData &&
          taskData.map((item, idx) => (
             <>
              <div key={idx}>
                <li>{idx+1}</li>
              <li>{item.title}</li>
              <li>{item.description}</li>
              </div>
            </>
          ))}
      </ul>
    </>
  );
};

export default TaskList;
