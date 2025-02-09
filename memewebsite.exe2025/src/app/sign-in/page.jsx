'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        email,
        password,
      }).catch((error) => {
        console.error('Error signing in user:', error);
        setError('Invalid email or password');
      });
      console.log('User signed in successfully:', response.data);
      // Save the token in localStorage or cookies
      localStorage.setItem('token', response.data.data.token);
      // Redirect to the home page or another protected page
      router.push('/');
    } catch (error) {
      console.error('Error signing in user:', error);
      setError('Invalid email or password');
    }
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
              className="w-full p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;