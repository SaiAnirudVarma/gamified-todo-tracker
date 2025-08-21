import React, { useEffect, useRef, useState } from 'react';

const ScoreBoard = ({ percent = 0, xp = 0 }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    let start = animatedPercent;
    let end = percent;
    let startTime;
    const duration = 600;
    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const value = start + (end - start) * progress;
      setAnimatedPercent(value);
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    requestRef.current && cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [percent]);

  const percentage = Math.min(animatedPercent, 100);
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
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="xp-label">{Math.round(percentage)}%</div>
        <div className="xp-label">{xp} XP</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
