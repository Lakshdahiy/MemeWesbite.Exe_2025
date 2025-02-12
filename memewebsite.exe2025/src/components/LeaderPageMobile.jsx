'use client';
import React from "react";
import BottomBar from "./BottomBar";
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
  }
  return str;
}

export default function LeaderPageMobile({ leaders, handleOnClick }) {
  return (
    
    
    <div className="bg-black fixed p-4 backdrop-blur-lg h-full w-full right-0 overflow-y-auto scrollbar-thin no-scrollbar">
      <h2 className="font-extrabold m-2 text-purple-300 text-center text-2xl"> 🏆 LEADERBOARD</h2>
      <ul>
        {leaders.map((leader, i) => (
          <li
            key={i}
            className="rounded-lg border border-gray-900 m-2 px-5 py-2 flex justify-between items-center text-white"
            onClick={() => handleOnClick(leader._id)}
          >
            <div className="flex flex-col">
              <p className="font-bold text-xl">
                <span className="text-[#c084fc]">#</span>
                {leader.position}
              </p>
              <span className="text-gray-400 text-md mt-1">
                {truncateString(leader.Title, 15)}
              </span>
            </div>
            <span className="text-gray-400 text-xs mt-1">
              {leader.Upvotes} Upvotes
            </span>
          </li>
          
        ))}
      </ul>
      <BottomBar 
        />
    </div>
  );
}