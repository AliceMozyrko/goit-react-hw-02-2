import { useState, useEffect } from 'react';
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import css from "./App.module.css";

export default function App() {
  const [stats, setStats] = useState(() => {
    const savedStats = window.localStorage.getItem("saved-stats");
    try {
      return savedStats ? JSON.parse(savedStats) : { good: 0, neutral: 0, bad: 0 };
    } catch {
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  useEffect(() => {
    window.localStorage.setItem("saved-stats", JSON.stringify(stats));
  }, [stats]);

  const updateFeedback = feedbackType => {
    setStats(prevStats => ({
      ...prevStats,
      [feedbackType]: prevStats[feedbackType] + 1
    }));
  };

  const totalFeedback = stats.good + stats.neutral + stats.bad;
  const positivePercentage = totalFeedback ? Math.round((stats.good / totalFeedback) * 100) : 0;

  const resetData = () => {
    setStats({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  return (
    <div className={css.container}>
      <Description />
      <Options onClick={updateFeedback} total={totalFeedback} onResetData={resetData} />
      {totalFeedback > 0 ? (
        <Feedback value={stats} total={totalFeedback} positive={positivePercentage} />
      ) : (
        <Notification />
      )}
    </div>
  );
}
