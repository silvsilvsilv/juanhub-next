"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { PhotoCard } from "@/components/photo-card"
import { NewPhotoModal } from "@/components/new-photo-modal"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search, Edit  } from 'lucide-react'
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
  path: string;
  created_at:string;
  onDelete: () => Promise<void>;
  onAddToAlbum: () => Promise<void>;
}

interface Album {
  id: string
  title: string
  description: string
  photos: Image[]
}

type SortOption = 'dateAsc' | 'dateDesc' | 'nameAsc' | 'nameDesc'

export default function AlbumPage() {
  const params = useParams()
  const albumId = params.id as string

  const [isNewPhotoModalOpen, setIsNewPhotoModalOpen] = useState(false)
  const [album, setAlbum] = useState<Album | null>(null)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('dateDesc')

  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null)
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    // Simulating fetching album data
    // In a real application, you would fetch this data from your API
    const fetchAlbum = async () => {
      // This is mock data. Replace with actual API call in a real application.
      try {
        const response = await axios.get(`http://localhost:8000/api/albums/${albumId}/images`);
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
          console.error('Error fetching images:', error);
      }
    }

    fetchAlbum()
  }, [albumId])


  const handleAddPhoto = (photo: Image) => {
    if (album) {
      setAlbum({ ...album, photos: [...album.photos, photo] })
    }
  }

  const handleDeletePhoto = (id: number) => {
    setPhotoToDelete(id)
    setIsDeleteConfirmationOpen(true)
  }

  const confirmDeletePhoto = () => {
    if (photoToDelete && album) {
      setAlbum({ ...album, photos: album.photos.filter(photo => photo.id !== photoToDelete) })
      setPhotoToDelete(null)
    }
    setIsDeleteConfirmationOpen(false)
  }

  if (!album) {
    return <div>Loading...</div>
  }

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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">
              {album.title}
            </h2>
            <p className="text-zinc-600 mb-4">{album.description}</p>
          </div>
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
          {images.map((photo) => (
            <PhotoCard key={photo.id} url={`http://localhost:8000/storage/${photo.path}`} {...photo} />
          ))}
        </div>
      </main>
      
      <NewPhotoModal
        isOpen={isNewPhotoModalOpen}
        onClose={() => setIsNewPhotoModalOpen(false)}
        onAddPhoto={handleAddPhoto}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={confirmDeletePhoto}
        title="Delete Photo"
        description="Are you sure you want to delete this photo? This action cannot be undone."
      />
    </div>
  )
}

