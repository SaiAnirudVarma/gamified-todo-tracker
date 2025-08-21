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
    return () => requestRef.current && cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line
  }, [percent]);

  const percentage = Math.min(animatedPercent, 100);
  return (
    <div className="scoreboard">
      <div className="circle-progress">
        <svg width="120" height="120" style={{ position: 'relative' }}>
          <circle cx="60" cy="60" r="50" stroke="#e9ecef" strokeWidth="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#28a745"
            strokeWidth="8"
            fill="none"
            strokeDasharray="314.16"
            strokeDashoffset={314.16 - (314.16 * percentage / 100)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div className="xp-center">
          <div className="xp-value">{xp} XP</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
