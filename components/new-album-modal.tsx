"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface NewAlbumModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateAlbum: (albumName: string, albumDescription: string) => void
}

export function NewAlbumModal({ isOpen, onClose, onCreateAlbum }: NewAlbumModalProps) {
  const [albumName, setAlbumName] = useState("")
  const [albumDescription, setAlbumDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (albumName.trim() && albumDescription.trim()) {
      onCreateAlbum(albumName.trim(), albumDescription.trim())
      setAlbumName("")
      setAlbumDescription("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Album</DialogTitle>
          <DialogDescription>
            Enter a name for your new album.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="album-name" className="text-right">
                Album Name
              </Label>
              <Input
                id="album-name"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                className="col-span-3"
                placeholder="Enter album name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="album-description" className="text-right">
                Description
              </Label>
              <Input
                id="album-description"
                value={albumDescription}
                onChange={(e) => setAlbumDescription(e.target.value)}
                className="col-span-3"
                placeholder="Enter album description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!albumName.trim() || !albumDescription.trim()}>
              Create Album
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

