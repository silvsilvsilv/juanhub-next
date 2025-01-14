"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from 'lucide-react'
import axios from "axios"
import { PhotoCard } from "@/components/read-only-photo-card"
import { Navigation } from "@/components/navigation-no-login"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

type SortOption = 'dateAsc' | 'dateDesc' | 'nameAsc' | 'nameDesc'

export default function AllUploadsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('dateDesc')

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

  const sortedAndFilteredPhotos = useMemo(() => {
      return filteredUploads
        .sort((a, b) => {
          switch (sortOption) {
            case 'dateAsc':
              return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            case 'dateDesc':
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case 'nameAsc':
              return a.title.localeCompare(b.title)
            case 'nameDesc':
              return b.title.localeCompare(a.title)
            default:
              return 0
          }
        })
    }, [filteredUploads, sortOption])

  return (
    <div className="min-h-screen bg-zinc-50">
        <Navigation/>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-zinc-900 mb-6">User Uploads</h1>
            <div className="mb-6 flex justify-between items-center">
                <div className="flex w-full max-w-sm items-center space-x-2 mr-2">
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                        <ArrowUpDown className="mh-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortOption('dateDesc')} className={`${sortOption == "dateDesc" ? "bg-black text-white":""}`}>
                        Newest First
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('dateAsc')} className={`${sortOption == "dateAsc" ? "bg-black text-white":""}`}>
                        Oldest First
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('nameAsc')} className={`${sortOption == "nameAsc" ? "bg-black text-white":""}`}>
                        Name A-Z
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption('nameDesc')} className={`${sortOption == "nameDesc" ? "bg-black text-white":""}`}>
                        Name Z-A
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAndFilteredPhotos.map((photo) => (
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

