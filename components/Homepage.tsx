import React from "react";
import { Button } from "./ui/button";
import About from "./About";
import Image from 'next/image';
import DBIcon from "./ui/dbicon";

import pic1 from '../app/public/1.png';
import pic2 from '../app/public/2.png';


export default function Homepage(){

    return(
        <>
            {/* Header */}
            <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

                <div className="columns-2 container mx-auto px-4 py-8">

                    <div>
                        <h1 className="text-7xl font-bold mb-8">
                        Showcase your moments with ease
                        </h1>

                        <p className="text-xl text-gray-700  mb-8 ">
                            Welcome to Juan Hub! Your ultimate platform for hosting videos and photos. Discover how easy it is to share your creativity with the world
                        </p>
                        
                        <div className="flex justify-left space-x-4">
                            <Button className="inline-flex max-w-fit">
                            Explore
                            </Button>
                            <Button variant={"secondary"} className="inline-flex max-w-fit bg-white outline outline-1 outline-black">
                            Get started
                            </Button>
                        </div>

                    </div>
                    
                    <Image src={pic1} width={3200} height={2245} alt="Image number 1"></Image>
                </div>
                
          
            </section>

            <section className="px-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">  

                <div  className="columns-2 container mx-auto px-4 py-8">

                    <Image src={pic2} width={3200} height={2373} alt="Image number 2"/>

                    <div className="ml-10">
                            <h1 className="text-5xl font-bold mb-4 ">Discover the Ultimate Content Management System for Your Media Needs</h1>

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

                </div>
        
            </section>

            <About/>

        </>
    );
}