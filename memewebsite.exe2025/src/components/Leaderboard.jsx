'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomSidebar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';
import { useIsMobile } from '@/hooks/use-mobile';

function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const isMobile = useIsMobile();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    fetchDataLeader();
  }, []);

  const fetchDataLeader = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/top/10`).then((response) => {
      console.log('Leaderboard data:', response.data);
      setLeaders(response.data.data);
    })
    .catch((error) => {
      console.log('Error fetching leaderboard:', error);
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      {!isMobile }
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Leaderboard</h1>
          <ul>
            {leaders.map((leader, index) => (
              <li key={index} className="text-white mb-2">
                {index + 1}. {leader.name} - {leader.points} points
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isMobile && (
        <>
          <BottomBar showLeaderboard={showLeaderboard} setShowLeaderboard={setShowLeaderboard} />
          {showLeaderboard && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 p-4">
              <button onClick={() => setShowLeaderboard(false)} className="absolute top-4 right-4 text-white">
                Close
              </button>
              <Leaderboard leaders={leaders} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LeaderboardPage;