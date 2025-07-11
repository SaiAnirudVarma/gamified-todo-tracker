import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onComplete, onUndo }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`task-item ${task.category.toLowerCase().replace('/', '').replace(/\s/g, '')}`}
        >
          <span className={task.completed ? 'completed' : ''}>
            {task.text} <em>{task.category}</em>
          </span>
          <button
            onClick={() => task.completed ? onUndo(task.id) : onComplete(task.id)}
          >
            {task.completed ? 'Undo (-10 XP)' : 'Complete (+10 XP)'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
