'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        email,
        password,
      });
      console.log('User registered successfully:', response.data);
      // Redirect to the sign-in page
      router.push('/sign-in');
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;