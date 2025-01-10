"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from 'lucide-react'

interface FullSizePhotoDialogProps {
  isOpen: boolean
  onClose: () => void
  photo: {
    title: string
    url: string
  }
}

export function FullSizePhotoDialog({ isOpen, onClose, photo }: FullSizePhotoDialogProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-transparent border-none" onClick={onClose}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm"  />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative max-w-full max-h-full">
              <Image
                src={photo.url}
                alt={photo.title}
                width={dimensions.width}
                height={dimensions.height}
                className="object-contain max-w-full max-h-[calc(100vh-2rem)]"
              />
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                aria-label="Close full-size photo"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

