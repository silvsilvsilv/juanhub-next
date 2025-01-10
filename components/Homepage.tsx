import React from "react";

import About from "./About";

import Image from 'next/image';
import DBIcon from "./ui/dbicon";

import { Button } from "./ui/button";

import pic1 from '../app/public/1.png';
import pic2 from '../app/public/2.png';
import Link from "next/link";


export default function Homepage(){

    return(
        <>
            <div className="pb-14 bg-muted/40"></div>
            <section className="flex desktop:min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 phone:pb-10">

                <div className="flex flex-col container mx-auto px-4 desktop:py-8 desktop:flex-row">

                    <div>
                        <h1 className="font-bold mb-8 text-7xl desktop:text-7xl phone:text-4xl">
                        Showcase your moments with ease
                        </h1>

                        <p className="text-xl text-gray-700  mb-8 pr-8">
                            Welcome to Juan Hub! Your ultimate platform for hosting videos and photos. Discover how easy it is to share your creativity with the world
                        </p>
                        
                        <div className="flex justify-left space-x-4">
                            <Button className="inline-flex max-w-fit">
                                <Link href="/dashboard">
                                    Explore
                                </Link>
                            </Button>
                            <Button variant={"secondary"} className="inline-flex max-w-fit bg-white outline outline-1 outline-black">
                                <Link href="/register">
                                    Get started
                                </Link>
                            </Button>
                        </div>

                    </div>
                    
                    <Image src={pic1} width={500} height={300} alt="Image number 1" className="mt-10 w-auto h-auto" priority={true}></Image>
                </div>
                
          
            </section>

            <section className="px-4 flex desktop:min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 phone:pb-10">  

                <div  className="flex flex-col container mx-auto desktop:py-8 desktop:flex-row ">

                    <Image src={pic2} width={500} height={300} alt="Image number 2" className="phone:mb-10 hidden mr-10 w-auto h-auto desktop:flex" priority={true}/>

                    <div>
                            <h1 className="text-7xl font-bold mb-4 desktop:text-7xl phone:text-4xl">Discover the Ultimate Content Management System for Your Media Needs</h1>

                            <p className="text-xl text-gray-700 mb-8">Our platform simplifies video hosting and picture galleries, making media management effortless. Experience a user-friendly interface designed for everyone, from beginners to pros.</p>

                            <div className="flex space-x-4">
                                <div className="flex flex-col ">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <DBIcon/>
                                    </div>
                                    <h3 className="mt-2 font-bold">Video Hosting</h3>
                                    <p className="text-sm">Easily upload, organize, and share your videos with just a few clicks.</p>
                                </div>

                                <div className="flex flex-col ">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <DBIcon/>
                                    </div>
                                    <h3 className="mt-2 font-bold">Picture Galleries</h3>
                                    <p className="text-sm">Create stunning galleries to showcase your images beautifully and effortlessly.</p>
                                </div>
                            </div>
                    </div>

                    <Image src={pic2} width={500} height={300} alt="Image number 2" className="mt-10 desktop:hidden w-auto h-auto" priority={true}/>

                </div>
        
            </section>

            <About/>

        </>
    );
}