'use client'
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Fetch or compute leaderboard data
    const data = [
      { name: "UserA", score: 100 },
      { name: "UserB", score: 95 },
      { name: "UserC", score: 90 },
    ];
    setLeaders(data);
  }, []);

  return (
    <aside className="bg-white bg-opacity-10 backdrop-blur-lg p-4 rounded-lg shadow-lg">
      <h2 className="font-bold mb-2 text-white">Leaderboard</h2>
      <ul>
        {leaders.map((leader, i) => (
          <li key={i} className="border-b p-2 text-white">
            {leader.name} - {leader.score}
          </li>
        ))}
      </ul>
    </aside>
  );
}