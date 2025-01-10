'use client';


import img from "../public/reshot-illustration-website-design-ZK3N2W7CDX.png";
import Image from "next/image";
import DBIcon from "@/components/ui/dbicon";

import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

import registerUser from "./registerUser";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast"
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
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

    const handleUser = (e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };

    const router = useRouter();
    const { toast } = useToast();

    const handleConfirmPass = () =>{
      if( (user.password == user.confirmPass) && user.password ){
        

        return true;
      }

      return false;
    }

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();

      handleConfirmPass();

      if(handleConfirmPass()){
        const result = await registerUser(user.name, user.email, user.password);

        if (result) {
          toast({
            title: "Successfully Registered!",
            description: "You will be redirected soon.",
            variant:"default",
            duration:5000,
          });
          
          router.push("/");
        }
      }
      else
      {
        toast({
            title: "Registration Failed",
            description: "Invalid password. Please try again.",
            variant: "destructive", // Use a variant for error styling
            duration:8000,
        });
        
      }

    };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
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
            />
        </div>

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
                    <RegisterForm handleRegister={handleRegister} handleUser={handleUser} user={user} className=""/>
                </div>
            </div>
      </div>
    </div>
  )
}

