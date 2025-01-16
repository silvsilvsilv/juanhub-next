'use client'

import { Navigation } from "@/components/navigation"
// import { PhotoCard } from "@/components/photo-card"
import { PhotoCard } from "@/components/dashboard-photo-card"
import { PhotoStats } from "@/components/photo-stats"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { UploadListUser } from "@/components/upload-list-user"
import { useGlobalState } from "@/context/GlobalStateContext"

interface Image {
  id: number;
  user_id: number;
  title: string;
  url: string;
  created_at:string;
  onDelete: () => Promise<void>;
  uploader:{
    id:number
    name:string
  }
  is_approved:boolean
}

const backendUrl = 'http://localhost:8000'
// const backendUrl = 'https://ivory-llama-451678.hostingersite.com'

export default function Page() {
  const [images, setImages] = useState<Image[]>([]);
  const [username, setUsername] = useState<string>("");

  const router = useRouter()
  const { imagesUpdated } = useGlobalState();


   const fetchImages = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const isAdmin = localStorage.getItem('isAdmin')

      if(isAdmin == 'true'){
        router.push('/admin')
      }
      
      const response = await axios.get(`${backendUrl}/api/images`, {
        params: {
          user_id: userId,
        },
      });
      setImages(response.data)
    } catch (error){
      console.error('Error fetching images: ',error)
    }
  }, [router]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (imagesUpdated) {
      fetchImages();
      console.log("ASDHFJKASHDFKJ")
    }
    
  }, [imagesUpdated,fetchImages]);

  const approvedImages = images.filter(item => item.is_approved == true);
  const pendingImages = images.filter(item => item.is_approved == false);

  const sortedImages = [...approvedImages].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const recentPhotos = sortedImages.slice(0,4);

  useEffect(() => {
    const name = localStorage.getItem('name');
    setUsername(name||"");
  }, [])
  

  return (
    <div className="min-h-screen bg-zinc-50">
        <Navigation fetchImages={fetchImages}/>
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
             <h1 className="text-5xl font-bold text-zinc-900">
              Welcome {username}!
            </h1>
          </div>
          <div className="mb-8">
            <PhotoStats totalPhotos={approvedImages.length} totalPending={pendingImages.length}/>
          </div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-zinc-900">Recent Photos</h2>
            <div className="flex items-center space-x-4">
              <Link href="/all-photos">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentPhotos.map((photo, index) => (
              ( !!photo.is_approved && <PhotoCard key={index} {...photo} uploader={photo.uploader} fetchImages={fetchImages}/>)
            ))}
          </div>
          <div className="mb-6 mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-zinc-900">ASd Photos</h2>
            <div className="flex items-center space-x-4">
              <Link href="/all-photos">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </div>
          <UploadListUser fetchImages={fetchImages} images={ pendingImages }/>
        </main>
      </div>
  )
}

