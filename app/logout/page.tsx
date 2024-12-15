'use client';

// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const Logout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  //TODO : use cookies instead of this scuffed
  const router = useRouter();
    
  useEffect(() => {
    const user = localStorage.getItem('user');

    if(!user){
      router.push('/login');
    }
  }, [router])

  const handleLogout = () =>{
    localStorage.removeItem('user');

    setIsLoggingOut(true);

    router.push('/');
  }
  
    return (
      <>
        <h1>PROFILE</h1>
        
        
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
      </>
    );
};


export default Logout;