'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Leaderboard({ leaders }) {
  

  
  

  return (
    <div className="bg-black fixed p-4 backdrop-blur-lg h-full w-1/5 right-0 overflow-y-auto scrollbar-thin no-scrollbar"> 
      <h2 className="font-bold  m-2 text-white">Leaderboard</h2>
      <ul>
        {leaders.map((leader, i) => (
          <li key={i} className=" rounded-lg border border-gray-900 m-2 px-5 py-2 flex justify-between items-center text-white">
            <div className="flex flex-col">

            <p className="font-bold text-xl">
              <span className="text-[#c084fc]">#</span>{leader.position} 
              </p>
              <span className="text-gray-400 text-md mt-1 ">
              {leader.Title}

              </span>
            </div>
              <span className="text-gray-400 text-xs mt-1 ">
              

               <span className="text-white"> 
                {leader.Upvotes}
                </span>
                 {leader.Upvotes==1?" Upvote":" Upvotes"}
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
}