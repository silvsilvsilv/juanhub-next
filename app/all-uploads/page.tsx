"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import axios from "axios"
import { PhotoCard } from "@/components/photo-card"
import { Navigation } from "@/components/navigation-no-login"

interface UploadedImage {
  id: number;
  user_id: number;
  title: string;
  path: string;
  created_at:string;
  user:{
    id:number;
    name:string;
  }
  onDelete: ()=> Promise<void>;
}

export default function AllUploadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([]);

  const filteredUploads = images.filter(upload =>
    upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    upload.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchImages = async () => {
       try {
            const response = await axios.get(`https://ivory-llama-451678.hostingersite.com/api/photos`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
        <Navigation/>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-zinc-900 mb-6">All Uploads</h1>
            <div className="mb-6 flex justify-between items-center">
                <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Search photos or authors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon">
                    <Search className="h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredUploads.map((photo) => (
            <PhotoCard
                key={photo.id}
                {...photo}
                url={`https://ivory-llama-451678.hostingersite.com/storage/${photo.path}`}
                uploader={photo.user}
                />
            ))}
        </div>

      </main>
    </div>
  )
}

