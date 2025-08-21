import React, { useState, useEffect } from "react";

const TaskInput = ({ onAddTask, defaultDay }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Personal/Health");
  // Remove day state and dropdown

  const handleAdd = () => {
    if (task.trim() === "") return;
    onAddTask({ text: task, category, day: defaultDay });
    setTask("");
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input-field"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-input-select"
      >
        <option value="Personal/Health">Personal/Health</option>
        <option value="Work/Study">Work/Study</option>
        <option value="Hobbies">Hobbies</option>
      </select>
      <button
        onClick={handleAdd}
        className="task-input-btn"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
