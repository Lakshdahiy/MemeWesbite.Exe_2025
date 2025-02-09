'use client'

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import CustomSidebar from '@/components/SideBar';

function create() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [headers, setHeaders] = useState({});
  useEffect(() => {
    // Check if we are running on the client side
    if (typeof window !== 'undefined') {
        setHeaders({
                               Authorization: `Bearer ${localStorage.getItem("token")}`,
        })
    }
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      if (image) {
       
      
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "trials");  
      const res = await axios.post("https://api.cloudinary.com/v1_1/dcscznqix/image/upload", data);
      }
      
      

      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
        Title: title,
        Caption: caption,
        Image: image && res?.data.secure_url||'',
      }, {
        headers: headers
      }).then((response) => {
        toast.success('Meme uploaded successfully')
      }).catch((error) => {
        console.log('Error uploading meme:', error);
      });
    }
    catch(err){
      console.log(err)
    }
    
  }
  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="p-8 rounded-lg  w-full max-w-md">
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
    </div>
  );
}

export default create;