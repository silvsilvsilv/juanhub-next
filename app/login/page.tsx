'use client';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

import { useToast } from "@/hooks/use-toast"


// Importing styles
import styles from './main.module.css';
import utils from './util.module.css';

import { useState, useReducer } from "react";

// Importing the background image
import bgPic from '../public/reshot-illustration-website-design-ZK3N2W7CDX.png';

import loginUser from "./loginUser";

import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

const montserrat = Montserrat({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});


export default function Login() {

  // State for user credentials
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  // State for error message handling
  const [errorMessage, setErrorMessage] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[ _ ,forceUpdate] = useReducer(x => x + 1, 0);

  // Background styling for the login page
  const styling = {
    backgroundImage: `url(${bgPic.src})`,
  };

  const {toast} = useToast();

  // Handler for input changes
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  //handle Form Submit for Login
  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await loginUser(user.email, user.password);
      if (response) {
        console.log("Login succesful " + response.message);
        setErrorMessage(true);
        // Show toast notification
        toast({
          title: "Login Successful",
          description:"You will be redirected soon",
        });
        
        window.location.href = "/test";
      }
      else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive", // Use a variant for error styling
        duration:8000,
      });

      setErrorMessage(false);

      }
    } catch (err) {
      
      console.error("Login failed " + err);
    }
  }


  return (
    <div className={`${styles['login-container']} ${poppins.className} `}>
      <div className={styles['limiter']}>
        <div className={styles['container-login100']}>
          <div className={styles['wrap-login100']}>
            <form className={styles['login100-form']} onSubmit={handleLogin}>

              {/* Back Link with Arrow */}
              <Link href="/" className={utils['text-black']}>
                <ArrowLeft className={utils['m-b-40']} />
              </Link>

              {/* Login Title */}
              <span className={`${styles['login100-form-title']} ${utils['p-b-43']}`}>
                Login to continue
              </span>

              {/* Email Input */}
              <div className={`${styles['wrap-input100']} ${errorMessage? "" : styles['error']}`} data-validate="Valid email is required: ex@abc.xyz">
                <input
                  className={`${styles['input100']} ${user.email ? styles['has-val'] : ''} ${errorMessage}`}
                  type="email"
                  name="email"
                  onChange={handleUser}
                  value={user.email}
                />
                <span className={`${styles['focus-input100']} ${errorMessage? "" : styles['error']}`}></span>
                <span className={`${styles['label-input100']} ${errorMessage? "" : styles['error']}`}>Email</span>
              </div>

              {/* Password Input */}
              <div className={`${styles['wrap-input100']} ${errorMessage? "" : styles['error']}`} data-validate="Password is required">
                <input
                  className={`${styles['input100']} ${user.password ? styles['has-val'] : ''} ${errorMessage}`}
                  type="password"
                  name="password"
                  onChange={handleUser}
                  value={user.password}
                />
                <span className={`${styles['focus-input100']} ${errorMessage? "" : styles['error']}`}></span>
                <span className={`${styles['label-input100']} ${errorMessage? "" : styles['error']}`}>Password</span>
              </div>

              {/* Register Link */}
              <div className={`${utils['flex-sb-m']} ${utils['w-full']} ${utils['p-t-3']} ${utils['p-b-32']}`}>
                <div>
                  <p className={`${styles['txt1']} ${styles['paragraph']} ${montserrat.className}`}>
                    New to Juan Hub? <Link className={styles['txt1']} href="/register"><strong>Register</strong></Link>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles['container-login100-form-btn']}>
                <button className={styles['login100-form-btn']}>
                  <Link href="/" className={`${styles['text-white']} ${montserrat.className} ${utils['text-up']}` }>Login</Link>
                </button>
              </div>

            </form>

            {/* Additional Section (Background Image) */}
            <div className={styles['login100-more']} style={styling}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
