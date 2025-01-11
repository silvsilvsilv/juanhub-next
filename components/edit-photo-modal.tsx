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
import axios from "axios"

interface EditPhotoModalProps {
  isOpen: boolean
  onClose: () => void
  currentTitle: string
  id:number
}

export function EditPhotoModal({ id, isOpen, onClose, currentTitle }: EditPhotoModalProps) {
  const [title, setTitle] = useState(currentTitle)

  const handleUpdateTitle = async (id:number) => {
    try {
        await axios.put(`https://ivory-llama-451678.hostingersite.com/api/images/${id}`, { title: title });
        window.location.reload();
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      handleUpdateTitle(id)
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={(state) => {
    console.log("onOpenChange triggered with:", state); // Debug
    if (!state) onClose(); // Only close when requested
  }}>
      <DialogContent className={`sm:max-w-[425px] bg-white fixed ${isOpen ? 'block' : 'hidden'}`} >
        <DialogHeader>
          <DialogTitle>Edit Photo Title</DialogTitle>
          <DialogDescription>
            Update the title of your photo here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                autoFocus
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

