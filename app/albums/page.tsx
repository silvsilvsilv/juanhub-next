"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { NewAlbumModal } from "@/components/new-album-modal"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Plus, MoreVertical, Trash, Edit } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"

import { EditAlbumModal } from "@/components/edit-album-modal"
import placeholder from "../public/placeholder.svg"

interface Album {
  id: string
  title: string
  photoCount: number
  coverImage: string
  description:string
}

export default function AlbumsPage() {
  const [isNewAlbumModalOpen, setIsNewAlbumModalOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null)
  const [albums, setAlbums] = useState<Album[]>([])

  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false)
  const [albumToEdit, setAlbumToEdit] = useState<Album | null>(null)

  const handleCreateAlbum = () => {
   
    setAlbums([...albums, newAlbum])
  }

  const handleDeleteAlbum = (id: string) => {
    setAlbumToDelete(id)
    setIsDeleteConfirmationOpen(true)
  }

  const confirmDeleteAlbum = () => {
    if (albumToDelete) {
      setAlbums(albums.filter(album => album.id !== albumToDelete))
      setAlbumToDelete(null)
    }
    setIsDeleteConfirmationOpen(false)
  }

  const fetchAlbums = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.get(`http://localhost:8000/api/albums?user_id=${userId}`);
      setAlbums(response.data.albums);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-zinc-900">Albums</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsNewAlbumModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Album
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <Card key={album.id} className="relative hover:bg-zinc-100 transition-colors">
              <Link href={`/albums/${album.id}`}>
                <CardContent className="p-0">
                  <Image
                    src={placeholder || `${album.coverImage}`}
                    alt={album.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{album.title}</h3>
                    <p className="text-sm text-zinc-500 mt-1">{album.description}</p>
                    <p className="text-sm text-zinc-500 mt-2">{album.photoCount} photos</p>
                  </div>
                </CardContent>
              </Link>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setAlbumToEdit(album)
                      setIsEditAlbumModalOpen(true)
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteAlbum(album.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <NewAlbumModal
        isOpen={isNewAlbumModalOpen}
        onClose={() => setIsNewAlbumModalOpen(false)}
        onCreateAlbum={handleCreateAlbum}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={confirmDeleteAlbum}
        title="Delete Album"
        description="Are you sure you want to delete this album? This action cannot be undone."
      />

      <EditAlbumModal
        isOpen={isEditAlbumModalOpen}
        onClose={() => setIsEditAlbumModalOpen(false)} 
        onEditAlbum={function (id: string, title: string, description: string): void {
          throw new Error("Function not implemented.")
        } } album={null}      />
    </div>
  )
}

