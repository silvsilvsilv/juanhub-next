'use client'

import { PhotoCard } from "@/components/photo-card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react"

interface Image {
  id: number;
  user_id: number;
  title: string;
  url: string;
  created_at:string;
  onDelete: () => Promise<void>;
  onAddToAlbum: () => void;
}

export default function Test() {
  
  const [images, setImages] = useState<Image[]>([]);
  
 useEffect(() => {
    const fetchImages = async () => {
       try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://ivory-llama-451678.hostingersite.com/api/images`, {
            params: {
                user_id: userId,
            },
            });
            setImages(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    fetchImages();
  }, []);

  return(
    <>
      {images.map((photo, index) => (
                  // <PhotoCard key={index} {...photo} />
                ))}

      <Image
        src={`https://ivory-llama-451678.hostingersite.com/storage/images/T2ZN1RLxDjAJ5CNO5VY5Q95DDk64LQX9ktW0jMhJ.jpg`} 
        alt={""}      
      >

      </Image>
    </>
    
  );

}