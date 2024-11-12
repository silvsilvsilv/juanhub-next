'use client';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

import styles from '../login/main.module.css'; //  local scoped styles
import utils from '../login/util.module.css'; // reused utility styles

import bgPic from '../public/reshot-illustration-website-design-ZK3N2W7CDX.png';
import { useEffect, useState, useReducer } from "react";
import React from 'react';

import registerUser from "./registerUser"

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



export default function Register(){

    interface User{
      name:string,
      password:string,
      email:string,
      confirmPass:string,
    }

    const [user, setUser] = useState<User>({
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    });

    const [className, setClassName] = useState(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const[ _ ,forceUpdate] = useReducer(x => x + 1, 0);


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

    const handleConfirmPass = () =>{
      if( (user.password == user.confirmPass) && user.password ){
        // alert("chakto");
        setClassName(true);
        forceUpdate();
        return true;
      }
      alert("Passwords not the same");
      forceUpdate();
      setClassName(false);
      return false;
    }

    useEffect(() => {
      // if( (user.password == user.confirmPass) && user.password ){
      //   setClassName(true);
      // }
      // else{
      //   setClassName(false);
      // }
    
    }, [className, user.confirmPass, user.password])
    


    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();

      handleConfirmPass();

      if(handleConfirmPass()){
        const result = await registerUser(user.name, user.email, user.password);

        if (result) {
          console.log('User registered:', result.user);
          // You can store the token or navigate to another page, e.g., localStorage.setItem('token', result.token);
          alert("Successfully Registered!");
        }
      }
      else
      {
        console.log("wrong password");
      }

      
    };
    
    return(
        <>  
          <div className={`${styles['limiter']} ${poppins.className}`}>
            <div className={styles['container-login100']}>
              <div className={styles['wrap-login100']}>
                
                <div className={styles['login100-more']} style={styling}>
                </div>

                <form className={styles['login100-form']} onSubmit={handleRegister} >

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
                    <span className={`${styles['label-input100']}`}>
                      <span className={`${className? "" : styles['error']}`}>
                        Password
                      </span>
                    </span>
                  </div>

                  <div className={`${styles['wrap-input100']} ${styles['validate-input']}`} data-validate="Password is required">
                    <input 
                      className={`${styles['input100']} ${user.confirmPass ? styles["has-val"] : ""} ${className}`} 
                      type="password" 
                      name="confirmPass" 
                      onChange={handleUser} 
                      value={user.confirmPass}
                    />
                    <span className={styles['focus-input100']}></span>
                    <span className={styles['label-input100']}><span className={`${className? "":styles['error']}`}>Confirm Password</span></span>
                  </div>

                  <div className={`${utils['flex-sb-m']} ${utils['w-full']} ${utils['p-t-3']} ${utils['p-b-32']}`}>
                    <div>
                      <p className={`${styles['txt1']} ${styles['paragraph']} ${montserrat.className}`}>
                        {`Already have an account? `} 
                        <Link href="/login" className={`${styles["txt1"]}`}>
                          <strong>Log In</strong>
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* <button onClick={handleConfirmPass}>BBB</button> */}

                  <div className={styles['container-login100-form-btn']}>
                    <button className={styles['login100-form-btn']}>
                      <Link href="" className={styles['text-white']} onSubmit={handleRegister}>Register</Link>
                    </button>
                  </div>
                  
                </form>

              </div>
            </div>
          </div>
        </>
    );
}
