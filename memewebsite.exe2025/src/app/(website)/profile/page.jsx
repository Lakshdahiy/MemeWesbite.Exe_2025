'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';
import { useIsMobile } from '@/hooks/use-mobile';

function ProfilePage() {
  const router = useRouter();
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
        console.log(response.data.data);  
        
      })
      .catch(error => {
        console.log('Error fetching profile:', error);
        localStorage.removeItem('token');
        window.location.reload();
      });
    }
  }, [router]);
 

  

  return (
    <div className="flex items-center min-h-screen bg-black">
      {!isMobile && <CustomSidebar />}
      <div className="flex flex-col mx-auto items-center justify-center p-4">
        <div className="border border-gray-800 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="text-center border-b border-gray-300 pb-5 mb-5">
            <div className="flex flex-col items-center">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-24 h-24 rounded-full mb-3" />
              ) : (
                <div className="w-24 h-24 rounded-full mb-3 bg-gray-300"></div>
              )}
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
          
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <span className="text-gray-400">{profile.NumberOfPosts}{profile.NumberOfPosts==1?" Post":" Posts"}</span>
              <span className="text-gray-400">{profile.NumberofUpvotes}{profile.NumberofUpvotes==1?" Upvotes":" Upvotes"}</span>
            </div>
          </div>
        </div><span className="text-white text-2xl my-5">Posts</span>
        <div className="grid gap-3 grid-flow-col items-center justify-center p-4">
        {profile.posts && profile.posts.map(post => (
          <div key={post._id} className="lg:max-w-xl md:max-w-md max-w-sm mx-auto hover:scale-105 transition-all shadow-md rounded-lg px-4 py-6 mb-4 border border-gray-800">
            <div className="flex h-40 w-40 flex-col transition-all  items-center justify-center ">
              {post.Image?<img
                src={post.Image}
                alt="User"
                className=" mr-2 "
              />:<></>}
              <span className="font-semibold text-white">{post.Title}</span>
            </div>
          </div>
        ))}

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