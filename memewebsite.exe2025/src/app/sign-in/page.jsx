'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signin', {
        email,
        password,
      });
      console.log('User signed in successfully:', response.data);
      // Save the token in localStorage or cookies
      localStorage.setItem('token', response.data.token);
      // Redirect to the home page or another protected page
      router.push('/');
    } catch (error) {
      console.error('Error signing in user:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
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
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInPage;