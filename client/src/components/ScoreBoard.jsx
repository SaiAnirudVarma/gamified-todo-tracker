import React from 'react';

const ScoreBoard = ({ xp }) => {
  const percentage = Math.min((xp % 100), 100);

  return (
    <div className="scoreboard">
      <div className="circle-progress">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="#ddd" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#4CAF50"
            strokeWidth="10"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * percentage / 100)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="xp-label">{xp} XP</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
