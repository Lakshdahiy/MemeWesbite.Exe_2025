'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomSidebar from '@/components/SideBar';

function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  

  useEffect(() => {
    if (!email || !password) {
      router.push('/sign-up');
    }
  }, [email, password, router]);

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
      console.error('Error verifying OTP:', error);
      setError('Error verifying OTP');
    }
  };

  return (
    <div className="flex">
      <CustomSidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-blue-900">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Verify OTP</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleVerifyOtp}>
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
          </form>
          <div className="mt-4 text-center flex flex-col items-center justify-center">
            <p className="text-gray-300">Already have an account?</p>
            <a href="/sign-in" className="text-purple-500">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtpPage;