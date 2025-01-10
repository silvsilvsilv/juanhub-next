import React from "react";
import {FacebookIcon, InstagramIcon, LinkedinIcon} from 'lucide-react';

export default function Footer(){
    return(
        <>
            {/* Footer */}
            <footer className="bg-black text-white py-6">
            <div className="container mx-auto">  

                <div className="flex-col md:flex-row justify-between hidden desktop:flex ">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">Juan Hub</h3>
                        <p className="mt-2">Subscribe to our newsletter for the latest features, updates, and exclusive content.</p>
                        <form className="mt-4">
                            <button className="bg-black hover:bg-gray-500 text-white rounded-md px-4 py-2 ml-2 outline outline-1 outline-white">Join</button>
                        </form>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">Quick Links</h3>
                        <ul>
                            <li><a href="/" className="hover:text-gray-300">Home Page</a></li>
                            <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
                            <li><a href="#contact" className="hover:text-gray-300">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">Connect With Us</h3>
                        <ul className="flex space-x-4">
                            <li><a href="https://www.facebook.com/" className="hover:text-gray-300" title="Facebook"><FacebookIcon /></a></li>
                            <li><a href="https://www.instagram.com/" className="hover:text-gray-300" title="Instagram"><InstagramIcon/></a></li>
                            <li><a href="https://www.linkedin.com/" className="hover:text-gray-300" title="LinkedIn"><LinkedinIcon/></a></li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">Stay Connected</h3>
                        <p className="mt-2">Subscribe to our newsletter for the latest features, updates, and exclusive content.</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-4 pt-4">
                    <p className="text-sm text-center">&copy; 2024 Juan Hub. All rights reserved.</p>
                    <ul className="flex justify-center space-x-2 mt-2">
                        <li><a href="/" className="hover:text-gray-300">Privacy Policy</a></li>
                        <li><a href="/" className="hover:text-gray-300">Terms of Service</a></li> 
                        <li><a href="/" className="hover:text-gray-300">Cookie Settings</a></li>
                    </ul>
                </div>

            </div>
            </footer>
        </>
    );
}