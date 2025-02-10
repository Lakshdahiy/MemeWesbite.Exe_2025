'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Leaderboard from '../../components/Leaderboard';
import CustomSidebar from '@/components/SideBar';
import MemeSection from '../../components/MemeSection';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomBar from '@/components/BottomBar';
import toast from 'react-hot-toast';



export default function Page() {
  const [memes, setMemes] = useState([]);
  const [User, setUser] = useState<string | null>(null);
  const [leaders, setLeaders] = useState([]);
  const isMobile = useIsMobile();
  const[headers,setHeaders]=useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);


  useEffect(() => {
    // Fetch data from the backend
    if (typeof window !== 'undefined') {
      setHeaders({
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
      })
  }
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then((response) => {
      console.log('User data:', response.data);

    }).catch((error) => {
      console.log('Error fetching user data:', error);
      localStorage.removeItem('token');
      window.location.href = '/sign-in';
    });

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

interface CommentCallback {
  (): void;
}

const handleCommentSubmit = (id: string, comment: string, callback: CommentCallback) => {
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/comment/${id}`, { Description: comment }, {
    headers: headers
  }).then(() => {
    toast.success('Comment added');
    fetchData();
    callback();
  }).catch((error) => {
    toast.error(error.response.data.error);
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
    <div className="flex min-h-screen bg-black">
      {!isMobile && <CustomSidebar />}
      <div className="flex-1 flex flex-col">
      
        <div className="flex-1 p-4">
          <MemeSection memes={memes} user={User} handleUpvote={handleUpvote}  handleComment={handleCommentSubmit}  />
        </div>
      </div>
      {!isMobile && (
        
        <Leaderboard leaders={leaders} />
       
      )}
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
