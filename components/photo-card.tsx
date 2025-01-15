'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FullSizePhotoDialog } from "./full-size-photo-dialog"
import { EditPhotoModal } from "./edit-photo-modal"
import { ConfirmationModal } from "./confirmation-modal"

import { useState } from "react"
import axios from "axios"
import { Dialog } from "./ui/dialog"

interface PhotoCardProps {
  id: number
  title: string
  created_at: string
  url: string
  onDelete: () => Promise<void>
  uploader:{
    id:number
    name:string
  }
  user_id:number
}

export function PhotoCard({ id, title, created_at: date, url, uploader }: PhotoCardProps) {
  const [isFullSizeDialogOpen, setIsFullSizeDialogOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const newDate = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  const onDelete = async (id: number) => {
      try {
        await axios.delete(`https://ivory-llama-451678.hostingersite.com/api/images/${id}`);
        window.location.reload()
      } catch (error) {
        console.error('Error deleting image:', error);
      }
  };


  return (
    <>
      <Card className="bg-white border-zinc-200 hover:bg-zinc-50 transition-colors">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={url}
              alt={title}
              width={300}
              height={300}
              className="w-full aspect-square object-cover rounded-t-lg"
              key={id}
              onClick={() => setIsFullSizeDialogOpen(true)}
              priority={true}
            />
            <div className="absolute top-2 right-2">
              <Dialog>
                <DropdownMenu>
                  
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="w-8 h-8 bg-black/50 hover:bg-black/70">
                      <MoreHorizontal className="h-4 w-4 text-white" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => setIsEditModalOpen(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setIsDeleteModalOpen(true)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>

                </DropdownMenu>
              </Dialog>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold text-zinc-900">{title}</h3>

            { (uploader.name)? <p className="text-sm text-zinc-500">Uploaded by: {uploader.name}</p> : "" }

            <p className="text-sm text-zinc-500">{`${days[newDate.getDay()]} `}</p>
            <p className="text-sm text-zinc-500">Date: {` ${months[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`}</p>
          </div>
        </CardContent>
      </Card>

      <FullSizePhotoDialog
        isOpen={isFullSizeDialogOpen}
        onClose={()=>setIsFullSizeDialogOpen(false)}
        photo={ {id, title, date, url, uploader} }
      />
      
      <EditPhotoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false) }
        currentTitle={title}
        id={id}
      />
  

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}  
        title={"Delete Photo"}
        description="Are you sure you want to delete this photo? This action cannot be undone."
        onConfirm={()=>onDelete(id)}
        />

    </>
  )
}

