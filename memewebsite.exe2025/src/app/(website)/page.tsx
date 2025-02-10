'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../../components/Leaderboard';
import SearchBar from '../../components/SearchBar';
import CustomSidebar from '@/components/SideBar';
import MemeSection from '../../components/MemeSection';
import { useIsMobile } from '@/hooks/use-mobile';
import toast from 'react-hot-toast';



export default function Page() {
  const [memes, setMemes] = useState([]);
  const [User, setUser] = useState<string | null>(null);
  const [leaders, setLeaders] = useState([]);
  const isMobile = useIsMobile();
  const[headers,setHeaders]=useState({});


  useEffect(() => {
    // Fetch data from the backend
    if (typeof window !== 'undefined') {
      setHeaders({
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
      })
  }
    fetchDataLeader();
   
    fetchData();
    const user = localStorage.getItem('user');
    if (user) {
      setUser(user);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/get`);
      setMemes(response.data.data);
      console.log(response.data.data);  
      
    } catch (error) {
      console.log('Error fetching memes:', error);
    }
  }
  const fetchDataLeader=async()=>{
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/top/10`).then((response) => {
      console.log('Leaderboard data:', response.data);
      setLeaders(response.data.data);
    })
    .catch((error) => {
      console.log('Error fetching leaderboard:', error);
    });
  }

 

  const handleUpvote = (id: string,upvoted: boolean) => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/upvote/${id}`, {}, {
      headers: headers
    }).then(() => {
      toast.success(upvoted?'Upvote Removed':'Upvoted');
      fetchDataLeader();
      fetchData();
    }).catch((error) => {
      toast.success(error.response.data.error);
    });
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      <CustomSidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <SearchBar />
        </div>
        <div className="flex-1 p-4">
          <MemeSection memes={memes} user={User} handleUpvote={handleUpvote}  />
        </div>
      </div>
      {!isMobile && (
        <div className="w-64">
          <Leaderboard leaders={leaders} />
        </div>
      )}
    </div>
  );
}
