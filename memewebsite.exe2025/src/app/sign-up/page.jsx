'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/send-otp`, {
        email,
      });
      console.log('OTP sent successfully:', response.data);
      // Redirect to the OTP verification page
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setError('Error requesting OTP');
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleRequestOtp}>
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
              Request OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;