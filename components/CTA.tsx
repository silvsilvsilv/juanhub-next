import React from "react";
import {Button} from './ui/button';

export default function CTA(){
    return(
        <>
            <section className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="columns-2 container mx-auto px-4 py-8">

                    <div>
                        <h1 className="text-6xl font-bold mb-8">
                            Start Your Creative Journey Today
                        </h1>

                    </div>

                    <div>
                        <p className="text-xl text-gray-700 mb-8">Unlock your potential with our intuitive content management system. Sign up now to effortlessly host and share your videos and pictures</p>
                        
                        <div className="space-x-4">
                            <Button className="inline-flex max-w-fit">
                                Sign Up
                            </Button>
                            <Button variant="link" className="inline-flex max-w-fit outline outline-1 outline-color">
                                Learn More
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
}