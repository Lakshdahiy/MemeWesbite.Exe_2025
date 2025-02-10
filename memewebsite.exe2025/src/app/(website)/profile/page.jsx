'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';
import { useIsMobile } from '@/hooks/use-mobile';

function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    avatar: '',
  });
  const isMobile = useIsMobile();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      // Fetch user profile data
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setProfile(response.data.data);
      })
      .catch(error => {
        console.log('Error fetching profile:', error);
        localStorage.removeItem('token');
        window.location.reload();
      });
    }
  }, [router]);

  

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      {!isMobile && <CustomSidebar />}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center border-b border-gray-300 pb-5 mb-5">
            <div className="flex flex-col items-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-24 h-24 rounded-full mb-3" />
              ) : (
                <div className="w-24 h-24 rounded-full mb-3 bg-gray-300"></div>
              )}
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              ) : (
                <p className="text-gray-600">{bio}</p>
              )}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {isEditing ? (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
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

export default ProfilePage;