import React from "react";
// import pic3 from '../app/public/3.png';
// import pic4 from '../app/public/4.png';
import pic5 from '../app/public/5.png';
import Image from 'next/image';
import { Button } from "./ui/button";
import { ChevronRight, CirclePlus,ArrowUpToLineIcon,NotebookTabs } from "lucide-react";
import CTA from "./CTA";

// import { Link } from "lucide-react";
// import Link from "next/link"


export default function About(){
    return (
        <>
            <div id="about" className="mb-14 bg-muted/40"></div>
            <section className="min-h-screen px-4 flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 items-center" >
                 <div className="md:w-1/2">
                    <h1 className="text-6xl font-bold mb-4 text-center">Experience seamless high-quality video streaming for all your content needs.</h1>
                    <p className="text-lg mb-8 text-center">Enjoy secure storage solutions that keep your media safe and accessible. Manage your content effortlessly with our intuitive platform designed for everyone.</p>
                    <div className="flex justify-center space-x-4">
                        <Button >Learn More</Button>
                    </div>
                    
                </div>

            </section>

                {/* pls fix Learn More button is above Image when in 1366*768  */}
            <section className="flex min-h-screen flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10" >
                
                <div className="columns-2 container mx-auto px-4 py-8">

                    <div >
                        <h1 className="text-7xl font-bold mb-8">
                        Unlock Your Creative Potential with Ease
                        </h1>

                        <p className="text-xl text-gray-700  mb-8 ">
                            Our content management system simplifies the way you host and share your videos and images. Experience seamless organization and enhanced visibility for your work
                        </p>
                        
                        {/* <div className="flex justify-left space-x-4">
                            <Button className="inline-flex max-w-fit">
                            Explore
                            </Button>
                            <Button variant={"secondary"} className="inline-flex max-w-fit bg-white outline outline-1 outline-black">
                            Get started
                            </Button>
                        </div> */}

                    </div>

                    <Image src={pic5} width={3200} height={2086} alt="Image number 1"></Image>
                </div>
                
            </section>

            <section className="px-4 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

                <div className="rows-2 container mx-auto px-4 py-8">
                    <div className="md:w-1/2">
                        <h1 className="text-6xl font-bold mb-4">Effortlessly Upload and Manage Your Media</h1>
                        <p className="text-lg mb-8">Our platform simplifies the process of uploading and managing your videos and pictures. With just a few clicks, you can have your media organized and ready to share.</p>
                    </div>

                    <div className="md:w-auto grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <CirclePlus/>
                            </div>
                            <h2 className="mt-2 font-bold">Step 1: Create Your Account Today</h2>
                            <p className="text-sm">Sign up to get started with your media journey.</p>
                            </div>
                            <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <ArrowUpToLineIcon/>
                            </div>
                            <h2 className="mt-2 font-bold">Step 2: Upload Your Media Files</h2>
                            <p className="text-sm">Easily drag and drop your videos and pictures into the platform.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <NotebookTabs/>
                            </div>
                            <h2 className="mt-2 font-bold">Step 3: Organize and Manage Your Content</h2>
                            <p className="text-sm">Use our intuitive tools to categorize and edit your media.</p>
                        </div>

                        <div className="flex justify-left space-x-4 py-12">
                            <Button className="inline-flex max-w-fit">
                            Upload
                            </Button>
                            <Button variant="link" className="inline-flex max-w-fit">
                            Learn More
                            <ChevronRight></ChevronRight>
                            </Button>
                        </div>
                    </div>

                    
                </div>
                
            </section>

            <CTA/>
        </>
    );
}