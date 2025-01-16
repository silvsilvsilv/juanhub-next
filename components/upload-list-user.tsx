'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash, Maximize2 } from 'lucide-react'
import axios from 'axios'

interface Images {
  id: number;
  user_id: number;
  title: string;
  url: string;
  created_at:string;
  onDelete: () => Promise<void>;
  is_approved:boolean;
  uploader:{
    id:number
    name:string
  }
}

interface UploadListProps{
  fetchImages : () => Promise<void>
  images:Images[]
}

// const backendUrl = 'http://localhost:8000'
const backendUrl = 'https://ivory-llama-451678.hostingersite.com'

export function UploadListUser({fetchImages, images}:UploadListProps) { 
  const [editingUpload, setEditingUpload] = useState<Images | null>(null)
  const [viewingUpload, setViewingUpload] = useState<Images | null>(null)
  const [newTitle, setNewTitle] = useState('')
  


  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${backendUrl}/api/images/${id}`);
      await fetchImages()
    } catch (error) {
        console.error('Error deleting image:', error);
    }
  };

  const handleEdit = (upload:Images) => {
    setEditingUpload(upload);
    setNewTitle(upload.title)
  }

  const handleSaveEdit = async () => {
    try {
        await axios.post(`${backendUrl}/api/images/${editingUpload?.id}`, { title: newTitle });
    } catch (error) {
      console.error('Error updating title:', error);
    }

    await fetchImages()
  };

  const handleViewImage = (upload: Images) => {
    setViewingUpload(upload)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((upload) => (
            <TableRow key={upload.id}>
              <TableCell>
                <div className="relative w-16 h-16">
                  <Image
                    src={upload.url}
                    alt={upload.title}
                    layout="fill"
                    objectFit="cover"
                    className="cursor-pointer"
                    onClick={() => handleViewImage(upload)}
                  />
                </div>
              </TableCell>
              <TableCell>{upload.title}</TableCell>
              <TableCell>
                <Badge className={`${ (upload.is_approved? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-400 hover:bg-yellow-500 text-black') }` }>
                  {upload.is_approved ? 'Approved' : 'Pending'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(upload)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(upload.id)}>
                    <Trash className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewImage(upload)}>
                    <Maximize2 className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingUpload} onOpenChange={() => setEditingUpload(null)}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Edit Upload Title</DialogTitle>
          </DialogHeader>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUpload(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingUpload} onOpenChange={() => setViewingUpload(null)}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle>{viewingUpload?.title}</DialogTitle>
          </DialogHeader>
          {viewingUpload && (
            <div className="relative w-full" style={ { height: '70vh' } }>
              <Image
                src={viewingUpload.url}
                alt={viewingUpload.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
