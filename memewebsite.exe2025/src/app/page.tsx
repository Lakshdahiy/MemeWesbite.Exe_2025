'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../components/Leaderboard';
import SearchBar from '../components/SearchBar';
import AppSidebar from '../components/SideBar';
import MemeSection from '../components/MemeSection';

export default function Page() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:4000/api/memes')
      .then(response => {
        setMemes(response.data);
      })
      .catch(error => {
        console.error('Error fetching memes:', error);
      });
  }, []);

  return (
    <div className="flex h-screen bg-black">
      <div className="w-1/5">
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <SearchBar />
        </div>
        <div className="flex-1 h-full">
          <MemeSection memes={memes} />
        </div>
      </div>
      <div className="flex flex-col items-end justify-start pl-52">
        <Leaderboard />
      </div>
    </div>
  );
}
