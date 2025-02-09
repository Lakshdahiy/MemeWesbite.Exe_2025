'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';
import toast from 'react-hot-toast';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        email,
        password,
      }).then((response)=>{
        toast.success('User signed in successfully');
        console.log('User signed in successfully:', response.data);
      // Save the token in localStorage or cookies
      localStorage.setItem('token', response.data.data.token);
      router.push('/');

      }).catch((error) => {
        toast.error('Error signing in user');
        
      });
      
      // Redirect to the home page or another protected page
     
    
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign In</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-20 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-20 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600"
            >
              Sign In
            </button>
          </form>

          <hr className="my-4 border-gray-300" />
          <div className="text-center">
            <a href="/forgot-password" className="text-gray-300 hover:text-white">Forgot password?</a>
          </div>
          <div className="text-center mt-4 flex items-center justify-center">
            <p className="text-gray-300">Don't have an account?</p>
            <a href="/sign-up" className="text-purple-500 hover:text-purple-300">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;