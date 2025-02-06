'use client'
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Fetch or compute leaderboard data
    const data = [
      { name: "UserA", score: 100 },
      { name: "UserB", score: 95 },
    ];
    setLeaders(data);
  }, []);

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold mb-2">Leaderboard</h2>
      <ul>
        {leaders.map((leader, i) => (
          <li key={i} className="border-b p-2">
            {leader.name} - {leader.score}
          </li>
        ))}
      </ul>
    </aside>
  );
}