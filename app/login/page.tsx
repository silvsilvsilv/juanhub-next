'use client';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

// Importing styles
import styles from './main.module.css';
import utils from './util.module.css';

import { useState } from "react";

// Importing the background image
import bgPic from '../public/reshot-illustration-website-design-ZK3N2W7CDX.png';

import loginUser from "./loginUser";

export default function Login() {

  // State for user credentials
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // Background styling for the login page
  const styling = {
    backgroundImage: `url(${bgPic.src})`,
  };

  // Handler for input changes
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault();
  

    try {
      const response = await loginUser(user.email, user.password);
      if (response) {
        alert("Login Successful");
        console.log("Login succesful "+response.message);
      }
    } catch (err) {
      alert("Login Failed");
      console.error("Login failed " + err);
    }
  }

  return (
    <div className={styles['login-container']}>
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
              <div className={styles['wrap-input100']} data-validate="Valid email is required: ex@abc.xyz">
                <input
                  className={`${styles['input100']} ${user.email ? styles['has-val'] : ''}`}
                  type="text"
                  name="email"
                  onChange={handleUser}
                  value={user.email}
                />
                <span className={styles['focus-input100']}></span>
                <span className={styles['label-input100']}>Email</span>
              </div>

              {/* Password Input */}
              <div className={styles['wrap-input100']} data-validate="Password is required">
                <input
                  className={`${styles['input100']} ${user.password ? styles['has-val'] : ''}`}
                  type="password"
                  name="password"
                  onChange={handleUser}
                  value={user.password}
                />
                <span className={styles['focus-input100']}></span>
                <span className={styles['label-input100']}>Password</span>
              </div>

              {/* Register Link */}
              <div className={`${utils['flex-sb-m']} ${utils['w-full']} ${utils['p-t-3']} ${utils['p-b-32']}`}>
                <div>
                  <p className={`${styles['txt1']} ${styles['paragraph']}`}>
                    New to Juan Hub? <Link className={styles['txt1']} href="/register"><strong>Register</strong></Link>
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles['container-login100-form-btn']}>
                <button className={styles['login100-form-btn']}>
                  <Link href="/" className={styles['text-white']}>Login</Link>
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
