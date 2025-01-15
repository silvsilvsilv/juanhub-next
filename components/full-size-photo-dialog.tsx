"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FullSizePhotoDialogProps {
  isOpen: boolean
  onClose: () => void
  photo: {
    id: number
    title: string
    date: string
    url: string
    uploader:{
      id:number
      name:string
    } 
  }
}
interface Comment {
  id: number
  user_id: number
  content: string
  created_at: string
  image_id:number
  isEditing?: boolean
  replies:[Comment]
}

export function FullSizePhotoDialog({ isOpen, onClose, photo }: FullSizePhotoDialogProps) {

  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<string>("")
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEditComment = (id: string, newContent: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, content: newContent, isEditing: false } : comment
    ))
  }

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id))
  }

  const toggleEditComment = (id: string, content: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, isEditing: !comment.isEditing } : { ...comment, isEditing: false }
    ))
    setEditingComment(content)
  }

  if (!photo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{photo.title}</DialogTitle>
          <DialogDescription>
            Uploaded by {photo.uploader.name} on {photo.date}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Image
              src={photo.url}
              alt={photo.title}
              width={400}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <ScrollArea className="flex-grow mb-4 h-[200px]">
              {comments.map((comment) => (
                <div key={comment.id} className="mb-2 p-2 bg-gray-100 rounded">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold">{comment.user}</p>
                    {isLoggedIn && currentUser === comment.user && (
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => toggleEditComment(comment.id, comment.content)}>
                          {comment.isEditing ? 'Cancel' : 'Edit'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="mt-2">
                      <Input
                        value={editingComment}
                        onChange={(e) => setEditingComment(e.target.value)}
                        className="mb-2"
                      />
                      <Button onClick={() => handleEditComment(comment.id, editingComment)}>Save</Button>
                    </div>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                  <p className="text-xs text-gray-500">{comment.created_at}</p>
                </div>
              ))}
            </ScrollArea>
            {isLoggedIn ? (
              <div>
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={handleAddComment}>Add Comment</Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Please log in to add comments.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

