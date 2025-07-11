import React, { useState, useEffect } from "react";
import "./App.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const categories = ["Work", "Study", "Personal/Health", "Leisure"];

function App() {
  const [selectedDay, setSelectedDay] = useState(getToday());
  const [tasks, setTasks] = useState({});
  const [taskText, setTaskText] = useState("");
  const [category, setCategory] = useState("Work");
  const [xp, setXP] = useState(0);

  function getToday() {
    const todayIdx = new Date().getDay(); // Sunday is 0
    return days[(todayIdx + 6) % 7]; // Adjust Sunday to end
  }

  const handleAdd = () => {
    if (!taskText.trim()) return;

    const newTask = {
      text: taskText,
      category,
      completed: false,
    };

    setTasks((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newTask],
    }));

    setTaskText("");
    setCategory("Work");
  };

  const handleComplete = (taskIndex) => {
    const updated = { ...tasks };
    updated[selectedDay][taskIndex].completed =
      !updated[selectedDay][taskIndex].completed;
    setTasks(updated);
    setXP((prev) =>
      updated[selectedDay][taskIndex].completed ? prev + 10 : prev - 10
    );
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Work":
        return "#d0e7ff";
      case "Study":
        return "#fcd3d3";
      case "Personal/Health":
        return "#fffab7";
      case "Leisure":
        return "#c9f5d1";
      default:
        return "#eee";
    }
  };

  const getXPPercentage = () => {
    const totalTasks = (tasks[selectedDay] || []).length;
    const completedTasks = (tasks[selectedDay] || []).filter(
      (t) => t.completed
    ).length;
    return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="app-container">
      <h1 className="header">
        <span role="img" aria-label="fire">🔥</span> HabitHero
      </h1>

      <div className="day-buttons">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={selectedDay === day ? "active" : ""}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="xp-circle-container">
        <div className="xp-circle">
          <svg width="80" height="80">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#ccc"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#4caf50"
              strokeWidth="5"
              fill="none"
              strokeDasharray="219.91"
              strokeDashoffset={219.91 - (getXPPercentage() / 100) * 219.91}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
          </svg>
          <div className="xp-text">{xp} XP</div>
        </div>
      </div>

      <div className="task-input">
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter task..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <div className="task-list">
        {(tasks[selectedDay] || []).map((task, i) => (
          <div
            key={i}
            className="task"
            style={{
              backgroundColor: getCategoryColor(task.category),
              textDecoration: task.completed ? "line-through" : "none",
              fontStyle: task.completed ? "italic" : "normal",
              opacity: task.completed ? 0.6 : 1,
            }}
          >
            <span>
              {task.text}{" "}
              <em>{task.category}</em>
            </span>
            <button
              className="complete-btn"
              onClick={() => handleComplete(i)}
            >
              {task.completed ? "Undo (-10 XP)" : "Complete (+10 XP)"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
