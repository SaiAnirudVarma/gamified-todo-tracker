import React from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const StreakHeader = ({ selectedDay, setSelectedDay, scores }) => {
  return (
    <div className="streak-header">
      {days.map((day) => {
        const score = scores[day] || 0;
        const isActive = selectedDay === day;
        return (
          <div
            key={day}
            className={`day ${isActive ? 'active' : ''} ${score >= 70 ? 'success' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day.slice(0, 3)}
          </div>
        );
      })}
    </div>
  );
};

export default StreakHeader;
