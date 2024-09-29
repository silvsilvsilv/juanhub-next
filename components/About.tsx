import React from "react";
import pic3 from '../app/public/3.png';
import pic4 from '../app/public/4.png';
import pic5 from '../app/public/5.png';
import Image from 'next/image';
import { Button } from "./ui/button";

export default function About(){
    return (
        <>
            <section className="min-h-screen px-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 items-center" >
                 <div className="md:w-1/2">
                    <h1 className="text-6xl font-bold mb-4 text-center">Experience seamless high-quality video streaming for all your content needs.</h1>
                    <p className="text-lg mb-8 text-center">Enjoy secure storage solutions that keep your media safe and accessible. Manage your content effortlessly with our intuitive platform designed for everyone.</p>
                    <div className="flex justify-center space-x-4">
                        <Button >Learn More</Button>
                    </div>
                    
                </div>

                <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Image src={pic3} alt="Placeholder Image 1" width={200} height={200} className="rounded-lg" />
                    <Image src={pic4} alt="Placeholder Image 2" width={200} height={200} className="rounded-lg" />
                    <Image src={pic5} alt="Placeholder Image 3" width={200} height={200} className="rounded-lg" />
                </div>
            </section>

            <section className="min-h-screen px-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10" > 
                <h1 className="text-7xl items-center flex text-center bold">
                    Unlock Your Creative Potential with Ease
                </h1>
                <h2>
                    Our content management system simplifies the way you host and share your videos and images. Experience seamless organization and enhanced visibility for your work
                </h2>
            </section>

            <section className="min-h-screen px-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10" > 
                <h1 className="text-7xl items-center flex text-center bold">
                    Effortlessly Upload and Manage Your Media
                </h1>
                <h2>
                    Our platform simplifies the process of uploading and managing your videos and pictures. With just a few clicks, you can have your media organized and ready to share.
                </h2>
                
            </section>
        </>
    );
}