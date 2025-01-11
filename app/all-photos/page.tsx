'use client'

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { PhotoCard } from "@/components/photo-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"

interface Image {
  id: number;
  user_id: number;
  title: string;
  url: string;
  created_at:string;
  onDelete: () => Promise<void>;
  onAddToAlbum: () => Promise<void>;
}


type SortOption = 'dateAsc' | 'dateDesc' | 'nameAsc' | 'nameDesc'

export default function AllPhotosPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('dateDesc')

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
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    fetchImages();
  }, []);

  const sortedAndFilteredPhotos = useMemo(() => {
    return images
      .filter(photo => 
        photo.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
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
  }, [images, searchQuery, sortOption])


  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-900">All Photos</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search photos"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-auto"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort
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
            />
          ))}
        </div>
      </main>
    </div>
  )
}

