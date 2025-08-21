// src/components/HabitHero.js
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import StreakHeader from './StreakHeader';
import ScoreBoard from './ScoreBoard';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import confetti from 'canvas-confetti';

const getToday = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
};

function HabitHero({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedDay, setSelectedDay] = useState(getToday());
  const hasCelebratedRef = useRef(false);

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
    hasCelebratedRef.current = false; // adding a task resets celebration
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

  // Celebrate when transitioning to 100%
  useEffect(() => {
    if (filteredTasks.length > 0 && completedCount === filteredTasks.length && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      const duration = 1200;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 7,
          startVelocity: 35,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [completedCount, filteredTasks.length]);

  // Reset celebration flag when day changes
  useEffect(() => {
    hasCelebratedRef.current = false;
  }, [selectedDay]);

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
