// src/components/HabitHero.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import StreakHeader from './StreakHeader';
import ScoreBoard from './ScoreBoard';
import TaskInput from './TaskInput';
import TaskList from './TaskList';

const getToday = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
};

function HabitHero({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedDay, setSelectedDay] = useState(getToday());

  // Load tasks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('habitHeroTasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('habitHeroTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    if (typeof newTask === 'string' ? newTask.trim() === '' : newTask.text.trim() === '') return;
    const task = typeof newTask === 'string' ? {
      id: Date.now(),
      text: newTask,
      completed: false,
      category: 'Personal',
      day: selectedDay,
    } : {
      id: Date.now(),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const onCompleteTask = (index) => {
    setTasks(prevTasks => {
      const updated = [...prevTasks];
      const task = updated[index];
      if (task.completed) {
        updated[index] = { ...task, completed: false };
        setScore(s => Math.max(0, s - 10));
      } else {
        updated[index] = { ...task, completed: true };
        setScore(s => s + 10);
      }
      return updated;
    });
  };

  const streak = {
    Monday: tasks.filter(t => t.day === 'Monday').length,
    Tuesday: tasks.filter(t => t.day === 'Tuesday').length,
    Wednesday: tasks.filter(t => t.day === 'Wednesday').length,
    Thursday: tasks.filter(t => t.day === 'Thursday').length,
    Friday: tasks.filter(t => t.day === 'Friday').length,
    Saturday: tasks.filter(t => t.day === 'Saturday').length,
    Sunday: tasks.filter(t => t.day === 'Sunday').length,
  };

  // Only show tasks for selectedDay
  const filteredTasks = tasks.filter(t => t.day === selectedDay);
  const completedCount = filteredTasks.filter(t => t.completed).length;
  const percentComplete = filteredTasks.length === 0 ? 0 : Math.round((completedCount / filteredTasks.length) * 100);
  const dayXP = filteredTasks.filter(t => t.completed).length * 10;

  return (
    <div className="habit-hero-wrapper">
      <div className="habit-hero-card">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Header user={user} />
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
        <StreakHeader streak={streak} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <div className="scoreboard-wrapper">
          <ScoreBoard percent={percentComplete} xp={dayXP} />
        </div>
        <TaskInput onAddTask={handleAddTask} defaultDay={selectedDay} />
        <TaskList tasks={filteredTasks} onCompleteTask={onCompleteTask} />
      </div>
    </div>
  );
}

export default HabitHero;
