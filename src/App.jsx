import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { v4 } from "uuid";

function App() {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("task")) || []
  );

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await response.json();

      setTask(data);
    }
    // fetchData();
  }, []);

  function onTaskClick(taskId) {
    const newTask = task.map((task) => {
      if (task.id === taskId)
        return { ...task, isCompleted: !task.isCompleted };
      return task;
    });
    setTask(newTask);
  }

  function onTaskDelete(taskId) {
    const newTask = task.filter((task) => task.id !== taskId);
    setTask(newTask);
  }

  function onTaskAdd(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTask([...task, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciar Tarefas
        </h1>

        <AddTask onTaskAdd={onTaskAdd} />
        <Task
          task={task}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
