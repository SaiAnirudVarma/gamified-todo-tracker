import React, { useState } from 'react';

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal/Health');

  const handleAdd = () => {
    if (!text.trim()) return;

    const task = {
      id: Date.now(),
      text: text.trim(),
      category,
      completed: false,
    };

    onAddTask(task);
    setText('');
    setCategory('Personal/Health');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        placeholder="Enter task..."
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '6px', width: '50%' }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '6px', marginLeft: '10px' }}
      >
        <option value="Personal/Health">Personal/Health</option>
        <option value="Study">Study</option>
        <option value="Work">Work</option>
        <option value="Leisure">Leisure</option>
      </select>
      <button onClick={handleAdd} style={{ marginLeft: '10px', padding: '6px 12px' }}>
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
