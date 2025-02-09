'use client'

import React, { useState } from 'react';
import axios from 'axios';
import CustomSidebar from '@/components/SideBar';

function create() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Meme uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading meme:', error);
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="p-8 rounded-lg  w-full max-w-md">
          <h1 className="text-4xl font-sans font-extrabold mb-4 text-center text-purple-400">Upload Meme Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white">Caption</label>
              <input
                type="text"
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