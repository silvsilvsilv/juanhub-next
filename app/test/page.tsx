'use client';

import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';

const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          withCredentials: true,
        }
      );

      // Clear authentication state
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <h1>PROFILE</h1>
      
      <Link href="/">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </Link>
    </>
  );
};

export default LogoutButton;
