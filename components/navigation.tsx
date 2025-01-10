'use client'

import { Button } from "@/components/ui/button"
import { PlusCircle, Grid, FolderOpen } from 'lucide-react'
import { ProfileDropdown } from "@/components/profile-dropdown"
import { UploadModal } from "@/components/upload-modal"
import { useState } from "react"

import DBIcon from "@/components/ui/dbicon";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link"

const jetbrains = JetBrains_Mono({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

export function Navigation() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard"><DBIcon /></Link>
        <h1 className={`text-2xl font-bold text-zinc-900 ${jetbrains.className}`}>
            <Link href="/dashboard">Juan Hub</Link>
        </h1>
        
        <nav className="flex items-center space-x-2">
          <Link href="/all-photos">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
              <Grid className="mr-2 h-4 w-4" />
              All Photos
            </Button>
          </Link>
          
          <Link href="/albums">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
              <FolderOpen className="mr-2 h-4 w-4" />
              Albums
            </Button>
          </Link>
          
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant="default" 
          className="bg-black text-white hover:bg-gray-700"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
        <ProfileDropdown />
      </div>
      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  )
}

