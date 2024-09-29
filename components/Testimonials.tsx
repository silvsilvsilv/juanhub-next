import React from 'react';
import {Star, CircleUserRoundIcon} from 'lucide-react';


export default function Testimonials(){

    return(
        <>
           <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">

                <div className="row-2 container mx-auto px-4 py-8">

                    <div className='inline-flex'>
                        <Star className='fill-black'/>
                        <Star className='fill-black'/>
                        <Star className='fill-black'/>
                        <Star className='fill-black'/>
                        <Star className='fill-black'/>

                        <p className="text-xl text-gray-700  mb-8 ">
                            Welcome to Juan Hub! Your ultimate platform for hosting videos and photos. Discover how easy it is to share your creativity with the world
                        </p>
                        
                        <div className="flex justify-left space-x-4">
                            
                        </div>

                    </div>
                    
                    
                </div>
                
          
            </section>
        </>    
    );
}