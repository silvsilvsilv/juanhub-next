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
import { useToast } from "@/hooks/use-toast"
import { RegisterForm } from "@/components/register-form";
import { SuccessfulSignupModal } from "@/components/successful-signup-modal";

export default function RegisterPage() {
  const[isOpen, setIsOpen] = useState(false);

  const [isEmpty, setIsEmpty] = useState({
    name:false,
    email:false,
    password:false,
    confirmPass:false
  })
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

        handleEmptyInputField(name,value);
    };

    const { toast } = useToast();
 
    const handleEmptyInputField = (name:string,value:string) => {
      setIsEmpty({
        ...isEmpty,
        [name]: (value ? false:true),
      })
    }

    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault(); 

      if(user.password != user.confirmPass){
          toast({
            title:"Verify Password",
            description:"Please make sure your passwords match.",
            variant:"destructive",
            duration:5000
          })

          return;
      } else if(user.password.length < 8){
         toast({
            title:"An error has occurred",
            description:"Passwords must be at least 8 characters.",
            variant:"destructive",
            duration:5000
          })

          return;
      }
        
      if((user.password == user.confirmPass) && (user.password != "")){
        
        const result = await registerUser(user.name, user.email, user.password);
        if (result) {
          setIsOpen(true);
          // toast({
          //   title: "Successfully Registered!",
          //   description: "Congratulations, your account has been successfully created.",
          //   variant:"default",
          //   duration:5000,
          // });
          
          if(!isOpen){
            return;
          } 
        }
        else{
          toast({
            title:"Email already taken",
            description:"This email is already taken please use another one.",
            variant:"destructive",
            duration:5000,
          });
        }  
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
                    <RegisterForm handleRegister={handleRegister} handleUser={handleUser} user={user} className="" isEmpty={isEmpty}/>
                </div>
            </div>
            <SuccessfulSignupModal
              isOpen={isOpen}
              onClose={()=>setIsOpen(false)}
            />
      </div>
    </div>
  )
}

