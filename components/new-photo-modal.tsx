"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Photo {
  id: string
  title: string
  date: string
  imageUrl: string
}

interface NewPhotoModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPhoto: (photo: Photo) => void
}

export function NewPhotoModal({ isOpen, onClose, onAddPhoto }: NewPhotoModalProps) {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && imageUrl) {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        title,
        date: new Date().toISOString().split('T')[0],
        imageUrl
      }
      onAddPhoto(newPhoto)
      setTitle("")
      setImageUrl("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Add New Photo</DialogTitle>
          <DialogDescription>
            Enter the details of the new photo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter photo title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!title || !imageUrl}>
              Add Photo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

