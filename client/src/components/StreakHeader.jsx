import React from "react";
import "./StreakHeader.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const StreakHeader = ({ streak, selectedDay, setSelectedDay }) => {
  return (
    <div className="streak-header-container">
      <div className="streak-header">
        {days.map((day, index) => (
          <button
            key={day}
            className={`day-button${selectedDay === day ? ' selected' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {dayAbbr[index]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StreakHeader;
