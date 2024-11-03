"use client"; // This is a client-side component

import { useEffect, useState } from "react";
import styles from './main.module.css';

export default function HomePage() {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const section : HTMLElement | null = document.getElementById("my-section");


    const handleScroll = () => {
        const sectionTop = section?.getBoundingClientRect().top;
        const scrollPosition = window.scrollY;

        // Determine when we are past or before the section
        if (scrollPosition > (sectionTop || 0)) {
            setIsScrolledPast(true); // Scrolled past the section
        } else {
            setIsScrolledPast(false); // Not scrolled past or scrolled back up
        }
    };

    window.addEventListener("scroll", handleScroll);
    
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  return (
    <>
      <div className={`${isScrolledPast ? styles['default-header'] : styles['scrolled-header']  } sticky top-0 flex`  }>
        <h1>My Homepage Header</h1>
      </div>

      <div id="my-section" style={ { height: "100vh", background: "#f0f0f0" } }>
        <h2>This is the section to watch</h2>
      </div>

      <div style={{ height: "200vh", background: "#ccc" }}>
        <h2>Scroll down to test</h2>
      </div>

      {/* <div className="bg-red-500 ipadpro:bg-green-500 ipad:bg-blue-500 mobile:bg-yellow-500">
        Responsive element
      </div> */}

    </>
  );
}
