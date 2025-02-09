'use client'

import React from 'react';
import Leaderboard from '@/components/Leaderboard';
import CustomSidebar from '@/components/SideBar';

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Leaderboard />
      </div>
    </div>
  );
}