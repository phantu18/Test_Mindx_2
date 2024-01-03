import "./App.css";
import React, { useState, useEffect } from "react";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  // User story 1: Tạo task mới

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // User story 2: User có thể hoàn thành task đó

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // User story 3:Chuyển task giữa All, Active, Complete

  const filterTasks = (filterType) => {
    setFilter(filterType);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  // User story 4:  Xoá 1 hoặc tất cả các task đã hoàn thành

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  // User story 5: Lưu dữ liệu vào localStorage để không bị mất dữ liệu mỗi khi load lại trang

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // End Logic

  return (
    <div>
      <h1>#todo</h1>
      <input
        type="text"
        placeholder="add details"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask} style={{ padding: 20 }}>
        Add
      </button>
      <div>
        <button onClick={() => filterTasks("All")}>All</button>
        <button onClick={() => filterTasks("Active")}>Active</button>
        <button onClick={() => filterTasks("Completed")}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => completeTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                textAlign: "center",
              }}
            >
              {task.text}
            </span>
            {task.completed && (
              <button
                onClick={() => deleteTask(task.id)}
                style={{ backgroundColor: "#B31312" }}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      <button onClick={clearCompletedTasks} style={{ backgroundColor: "red" }}>
        Clear Completed
      </button>
    </div>
  );
};

export default App;
