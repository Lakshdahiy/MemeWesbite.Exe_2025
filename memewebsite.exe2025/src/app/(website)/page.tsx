'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../../components/Leaderboard';
import SearchBar from '../../components/SearchBar';
import CustomSidebar from '@/components/SideBar';
import MemeSection from '../../components/MemeSection';
import { useIsMobile } from '@/hooks/use-mobile';



export default function Page() {
  const [memes, setMemes] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Fetch data from the backend
   
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/get`);
      setMemes(response.data);
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      <CustomSidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <SearchBar />
        </div>
        <div className="flex-1 p-4">
          <MemeSection memes={memes} />
        </div>
      </div>
      {!isMobile && (
        <div className="w-64">
          <Leaderboard />
        </div>
      )}
    </div>
  );
}
