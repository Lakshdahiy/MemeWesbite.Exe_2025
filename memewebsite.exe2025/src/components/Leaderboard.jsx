'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Fetch or compute leaderboard data
    fetchData();
  }, []);
  const fetchData=async()=>{
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/top/10`).then((response) => {
      console.log('Leaderboard data:', response.data);
      setLeaders(response.data.data);
    })
    .catch((error) => {
      console.log('Error fetching leaderboard:', error);
    });
  }

  return (
    <div className="bg-black fixed p-4 backdrop-blur-lg h-full ">
      <h2 className="font-bold  m-2 text-white">Leaderboard</h2>
      <ul>
        {leaders.map((leader, i) => (
          <li key={i} className=" rounded-lg bg-gray-900 m-2 px-5 py-2 flex flex-col text-white">
            <p className="font-bold">
              #{leader.position} 
              </p>
              <span className="text-gray-400 text-sm mt-1 ">
              {leader.Title}

              </span>
              <span className="text-gray-400 text-xs mt-1 ">
              

               {leader.Upvotes} Upvotes
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
}