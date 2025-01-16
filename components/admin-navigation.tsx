'use client'

import { Button } from "@/components/ui/button"
import { Grid, ImageIcon } from 'lucide-react'
import { ProfileDropdown } from "@/components/profile-dropdown"


import DBIcon from "@/components/ui/dbicon";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link"

const jetbrains = JetBrains_Mono({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

export function AdminNavigation() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard"><DBIcon /></Link>
        <h1 className={`text-2xl font-bold text-zinc-900 ${jetbrains.className}`}>
            <Link href="/dashboard">Admin</Link>
        </h1>
        
        <nav className="flex items-center space-x-2">
          <Link href="/admin">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
              <Grid className="mr-2 h-4 w-4" />
              Pending Uploads
            </Button>
          </Link>
          <Link href="/all-uploads">
            <Button variant="ghost" className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100">
              <ImageIcon className="mr-2 h-4 w-4" />
              All Uploads
            </Button>
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ProfileDropdown />
      </div>
    </div>
  )
}

