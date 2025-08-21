import React from "react";
import "./TaskList.css";

const getCategoryColor = (category) => {
  switch (category) {
    case "Personal/Health":
      return "#fff9c4"; // yellowish
    case "Work/Study":
      return "#bbdefb"; // blueish
    case "Hobbies":
      return "#ffe0b2"; // orangish
    default:
      return "#f8f9fa"; // default light gray
  }
};

const TaskList = ({ tasks = [], onCompleteTask = () => {} }) => {
  return (
    <div className="task-list-container">
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`task-card${task.completed ? ' completed' : ''}`}
          style={{ background: getCategoryColor(task.category) }}
        >
          <div className="task-left">
            <span className="task-text">{task.completed ? <s>{task.text}</s> : task.text}</span>
          </div>
          <div className="task-category-container">
            <span className={`task-category-badge ${task.category.replace(/\W/g, '').toLowerCase()}`}>{task.category}</span>
          </div>
          <button
            className={`task-action-btn${task.completed ? ' undo' : ' complete'}`}
            onClick={() => onCompleteTask(index)}
          >
            {task.completed ? 'Undo (-10 XP)' : 'Complete (+10 XP)'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
