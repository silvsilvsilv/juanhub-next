'use client'

import { AdminNavigation } from "@/components/admin-navigation"
import { UploadList } from '@/components/upload-list'

export default function AdminPage(){
  
  return(
    <>
      <div className="min-h-screen bg-zinc-50">
            <AdminNavigation/>
            <main className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-6">Upload Management</h1>
              <UploadList />
            </main>
      </div>
    </>
  )
}