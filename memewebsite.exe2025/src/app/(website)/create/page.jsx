'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomSidebar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';
import { useIsMobile } from '@/hooks/use-mobile';

function CreatePage() {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [headers, setHeaders] = useState({});
  const isMobile = useIsMobile();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        Title: title,
        Caption: caption,
      };
      if (image) {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'trials');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dcscznqix/image/upload', data);
        updatedFormData.Image = res.data.secure_url;
      }

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/post`,
          {
            ...updatedFormData,
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          toast.success('Meme uploaded successfully');
          // Redirect to the home page to fetch the latest memes
          router.push('/');
        })
        .catch((error) => {
          console.log('Error uploading meme:', error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-blue-900">
      {!isMobile && <CustomSidebar />}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="p-8 rounded-lg w-full max-w-md">
          <h1 className="text-4xl font-sans font-extrabold mb-4 text-center text-purple-400">Upload Meme Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Title</label>
              <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Caption</label>
              <input
                type="text"
                required
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600"
            >
              Upload Meme
            </button>
          </form>
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

export default CreatePage;