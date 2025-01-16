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
import { Upload } from 'lucide-react'
import { useRouter } from "next/navigation"
import axios from 'axios'
import { SuccessfulUploadModal } from "./uploaded-successful"
import { useGlobalState } from "@/context/GlobalStateContext"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  fetchImages: () => Promise<void>
}

const backendUrl = 'http://localhost:8000'
// const backendUrl = 'https://ivory-llama-451678.hostingersite.com'

export function UploadModal({ isOpen, onClose, fetchImages }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [modal,setModal] = useState(false)

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    // Set the title to the file name (without extension) as a default
    if (file) {
      const fileName = file.name.split('.').slice(0, -1).join('.')
      setTitle(fileName)
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const { triggerUpdate } = useGlobalState()
  const handleUpload = async () => {
    if (selectedFile && title) {
      
      console.log("Uploading file:", selectedFile.name, "with title:", title)

      const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    
      if (!userId) {
        console.error('User ID not found in localStorage');
        
        router.push("/");
        return;
      }

      const formData = new FormData();
    
      formData.append('image', selectedFile); // Append the selected image
      formData.append('user_id', userId); // Append the user ID
      formData.append('title', title);

      try {
        const response = await axios.post(`${backendUrl}/api/images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('Image uploaded successfully:', response.data);
        setModal(true)
      } catch (error) {
        console.error('Error uploading image:',error);
      }

      await fetchImages()
      // After upload is complete, close the modal and reset the state
      triggerUpdate()
      onClose()
      setSelectedFile(null)
      setTitle("")
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Upload Photos</DialogTitle>
            <DialogDescription>
              Choose a photo and give it a title to add to your personal collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photo" className="text-right">
                Photo
              </Label>
              <Input
                id="photo"
                type="file"
                className="col-span-3"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="col-span-3"
                placeholder="Enter photo title"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpload} disabled={!selectedFile || !title}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SuccessfulUploadModal
        isOpen={modal}
        onClose={()=>setModal(false)}
      />
    </>
    
  )
}

