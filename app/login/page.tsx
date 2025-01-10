'use client';

import { LoginForm } from "../../components/login-form"

import img from "../public/reshot-illustration-website-design-ZK3N2W7CDX.png";
import Image from "next/image";
import DBIcon from "@/components/ui/dbicon";

import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

import loginUser from "./loginUser";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      router.push('/logout');
    }
  }, [router])
  

  // State for user credentials
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  const { toast } = useToast();

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
      setTimeout(()=> {console.log("Logging in")}, 10);

      if (response) {
        console.log("Login successful " + response.message);
       
        localStorage.setItem('user', JSON.stringify(response.user.id));
        localStorage.setItem('userId', `${response.user.id}`);
        localStorage.setItem('name', `${response.user.name}`);
        localStorage.setItem('email', `${response.user.email}`);
        localStorage.setItem('profile',`${response.user.profile_image}` )
        
        router.push('/dashboard');
      }
      else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive", // Use a variant for error styling
        duration:8000,
      });

      setIsLoading(false);
      }
    } catch (err) {
      
      console.error("Login failed " + err);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">

        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md ">
              <DBIcon />
            </div>
            <span className={`${jetbrains.className}`}>Juan Hub</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm handleLogin={handleLogin} handleUser={handleUser} user={user} className="" isLoading={isLoading} setIsLoading={setIsLoading}/>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
            src={img}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            layout="fill"
            objectFit="cover"
            style={ {
            filter: "brightness(0.8)",
            } }
            sizes="50vw"
            priority
        />
      </div>
    </div>
  )
}

