"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Album {
  id: string
  title: string
}

interface AddToAlbumModalProps {
  isOpen: boolean
  onClose: () => void
  onAddToAlbum: (albumId: string) => void
  albums: Album[]
}

export function AddToAlbumModal({ isOpen, onClose, onAddToAlbum, albums }: AddToAlbumModalProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAlbum) {
      onAddToAlbum(selectedAlbum)
      setSelectedAlbum(undefined)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add to Album</DialogTitle>
          <DialogDescription>
            Choose an album to add this photo to.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Select onValueChange={setSelectedAlbum} value={selectedAlbum}>
              <SelectTrigger>
                <SelectValue placeholder="Select an album" />
              </SelectTrigger>
              <SelectContent>
                {albums.map((album) => (
                  <SelectItem key={album.id} value={album.id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!selectedAlbum}>
              Add to Album
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

