'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isotpsending, setIsOtpSending] = useState(false);
  const [isotpsend, setIsOtpSend] = useState(false);
   const [otp, setOtp] = useState('');
  const [isoptverified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password,
        otp,
      });
      console.log('User registered successfully:', response.data);
      // Redirect to the sign-in page
      router.push('/sign-in');
    } catch (error) {
      console.log('Error verifying OTP:', error);
      setError(error.response.data.message);
    }
  };
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      setIsOtpSending(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup/send-otp`, {
        email,
      });
      setIsOtpSending(false);
      setIsOtpSend(true);
      toast.success('OTP sent successfully');
      // Redirect to the OTP verification page
      
    } catch (error) {
      console.log('Error requesting OTP:', error);
      toast.error(error.response.data.error)
      setIsOtpSending(false);
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          {isotpsend&&!isoptverified?<form onSubmit={handleVerifyOtp}>
            <div className="mb-4">
              <label className="block text-gray-300">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-20 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600"
            >
              Verify OTP
            </button>
          </form>:
          
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
              {isotpsending? 
              <h1>
                Requesting OTP
              </h1>:

              <h1>

                Request OTP
              </h1>
              }
            </button>
          </form>}
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;