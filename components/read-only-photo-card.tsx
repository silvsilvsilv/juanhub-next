'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { FullSizePhotoDialog } from "./full-size-photo-dialog"
import { useState } from "react"


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

  const newDate = new Date(date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  

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
        photo={ { title, url } }
      />
      
    </>
  )
}

