'use client';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

import styles from '../login/main.module.css'; //  local scoped styles
import utils from '../login/util.module.css'; // reused utility styles

import bgPic from '../public/reshot-illustration-website-design-ZK3N2W7CDX.png';
import { useState } from "react";

export default function Register(){

    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      confirmPass: ""
    });

    const styling = {
      backgroundImage: `url(${bgPic.src})`,
    };

    const handleUser = (e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };

    return(
        <>  
          <div className={styles['limiter']}>
            <div className={styles['container-login100']}>
              <div className={styles['wrap-login100']}>
                
                <div className={styles['login100-more']} style={styling}>
                </div>

                <form className={styles['login100-form']}>

                  {/* Back Link with Arrow */}
                  <Link href="/" className={utils['text-black']}>
                    <ArrowLeft className={utils['m-b-10']} />
                  </Link>

                  <span className={`${styles['login100-form-title']} ${utils['p-b-43']}`}>
                    Create an account
                  </span>
                  
                  <div className={`${styles['wrap-input100']} ${styles['validate-input']}`} data-validate="Valid name is required">
                    <input 
                      className={`${styles['input100']} ${user.name ? styles["has-val"] : ""}`} 
                      type="text" 
                      name="name" 
                      onChange={handleUser} 
                      value={user.name}
                    />
                    <span className={styles['focus-input100']}></span>
                    <span className={styles['label-input100']}>Name</span>
                  </div>

                  <div className={`${styles['wrap-input100']} ${styles['validate-input']}`} data-validate="Valid email is required: ex@abc.xyz">
                    <input 
                      className={`${styles['input100']} ${user.email ? styles["has-val"] : ""}`} 
                      type="text" 
                      name="email" 
                      onChange={handleUser} 
                      value={user.email}
                    />
                    <span className={styles['focus-input100']}></span>
                    <span className={styles['label-input100']}>Email</span>
                  </div>
                  
                  <div className={`${styles['wrap-input100']} ${styles['validate-input']}`} data-validate="Password is required">
                    <input 
                      className={`${styles['input100']} ${user.password ? styles["has-val"] : ""}`} 
                      type="password" 
                      name="password" 
                      onChange={handleUser} 
                      value={user.password}
                    />
                    <span className={styles['focus-input100']}></span>
                    <span className={styles['label-input100']}>Password</span>
                  </div>

                  <div className={`${styles['wrap-input100']} ${styles['validate-input']}`} data-validate="Password is required">
                    <input 
                      className={`${styles['input100']} ${user.confirmPass ? styles["has-val"] : ""}`} 
                      type="password" 
                      name="confirmPass" 
                      onChange={handleUser} 
                      value={user.confirmPass}
                    />
                    <span className={styles['focus-input100']}></span>
                    <span className={styles['label-input100']}>Confirm Password</span>
                  </div>

                  <div className={`${utils['flex-sb-m']} ${utils['w-full']} ${utils['p-t-3']} ${utils['p-b-32']}`}>
                    <div>
                      <p className={`${styles['txt1']} ${styles['paragraph']}`}>
                        {`Already have an account? `} 
                        <Link href="/login" className={`${styles["txt1"]}`}>
                          <strong>Log In</strong>
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className={styles['container-login100-form-btn']}>
                    <button className={styles['login100-form-btn']}>
                      <Link href="/" className={styles['text-white']}>Register</Link>
                    </button>
                  </div>
                  
                </form>

              </div>
            </div>
          </div>
        </>
    );
}
