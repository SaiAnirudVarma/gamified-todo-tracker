import React from "react";
import "./StreakHeader.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StreakHeader = ({ streak, selectedDay, setSelectedDay }) => {
  return (
    <div className="streak-header">
      {days.map((day) => (
        <button
          key={day}
          className={`day-button${selectedDay === day ? ' selected' : ''}`}
          onClick={() => setSelectedDay(day)}
        >
          {day}: {streak[day] || 0}
        </button>
      ))}
    </div>
  );
};

export default StreakHeader;
