'use client';

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
import DBIcon from "../components/ui/dbicon";
import { Menu } from 'lucide-react';

import Homepage from "@/components/Homepage"
import Footer from "@/components/Footer"
import { useState, useEffect } from "react";

function Home() {

  interface States{
    about:boolean,
    contact:boolean,
  }
  const [isScrolledPast, setIsScrolledPast] = useState<States>({about:false, contact:false });

  useEffect(() => {
    const about : HTMLElement | null = document.getElementById("about");
    const contact : HTMLElement | null = document.getElementById("contact");


    const handleScroll = () => {
        const sectionTop = {about:about?.getBoundingClientRect().top, contact:contact?.getBoundingClientRect().top};
        const screenHeight = window.innerHeight;

        // Create a new state object to incrementally update
        const newIsScrolledPast = { ...isScrolledPast };

        // Check the 'about' section
        if ( ((sectionTop.about !== undefined) && (sectionTop.about <= screenHeight)) && ((sectionTop.contact !== undefined) && (sectionTop.contact >= screenHeight)) ) {
          newIsScrolledPast.about = true;
        } else {
          newIsScrolledPast.about = false;
        }

        // Check the 'contact' section
        if (sectionTop.contact !== undefined && sectionTop.contact <= screenHeight) {
          newIsScrolledPast.contact = true;
        } else {
          newIsScrolledPast.contact = false;
        }

        // Update the state only once with the merged changes
        setIsScrolledPast(newIsScrolledPast);
    };

    window.addEventListener("scroll", handleScroll);
    
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolledPast]);


  return (
    // Navbar
     <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 text-nowrap">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base phone:text-base"
          >
            <DBIcon/>
            <span className="font-['JetBrains_Mono']">Juan Hub</span>
            <span className="sr-only">Juan Hub</span>
          </Link>

          <Link
            href="/"
            className={`${(isScrolledPast.about || isScrolledPast.contact)? 'text-muted-foreground':'text-cyan-400 font-bold'} transition-colors hover:text-foreground` }
          >
            Home
          </Link>

          <Link
            href="#about"
            className={`${isScrolledPast.about? 'text-cyan-400 font-bold':'text-muted-foreground'} transition-colors hover:text-foreground`}
          >
            About Us
          </Link>
          
          <Link
            href="#contact"
            className={`${isScrolledPast.contact? 'text-cyan-400 font-bold':'text-muted-foreground'} transition-colors hover:text-foreground`}
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex desktop:hidden ipad:hidden ipadpro:hidden text-nowrap">
          <DBIcon/>
          <span className="font-['JetBrains_Mono'] ml-3">Juan Hub</span>
        </div>
        
        <div className="w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 phone:hidden desktop:flex ipadpro:flex ipad:flex">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative space-x-4">
              <Link href="/register">
                <Button variant="secondary" className="bg-white outline outline-1 outline-black">
                  Join
                </Button>
              </Link>

              <Link href="/login">
                <Button>
                  Log In
                </Button>
              </Link>
            </div>
            
          </form>
        </div>
        <div className="w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 phone:flex desktop:hidden ipadpro:hidden ipad:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className="ml-auto"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Join</DropdownMenuItem>
              <DropdownMenuItem><Link href="/login">Log In</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </header>

      <main className="bg-muted/40">
        <Homepage/>
      </main>

      <Footer/>
    </div>
  )
}

export default Home;

