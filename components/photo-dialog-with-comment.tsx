"use client"

import { useEffect, useState } from "react"
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
import axios from "axios"

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
  user:{
    id:number
    name:string
  }
}

export function FullSizePhotoDialog({ isOpen, onClose, photo }: FullSizePhotoDialogProps) {

  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [editingComment, setEditingComment] = useState<string>("")
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const fetchComments = async () =>{
      try {
        const response = await axios.get(`https://ivory-llama-451678.hostingersite.com/api/images/${photo.id}/comments`);
        setComments(response.data);
      } catch (error) {
          console.error('Error fetching comments:', error);
      }
    }
    const user = localStorage.getItem('name');

    if(user){
      setIsLoggedIn(true);
      setCurrentUser(user);
    }

    fetchComments();
  }, [photo.id])
  
  
  const handleEditComment = (id: number, newContent: string) => {
    updateComment(id,newContent);
  }

  const handleDeleteComment = (id: number) => {
    deleteComment(id);
  }

  const toggleEditComment = (id: number, content: string) => {
    setIsEditing(!isEditing)
    handleEditComment(id, content)
  }

  const handleAddComment = () =>{
    addComment(newComment);
  }

  const addComment = async (newContent:string) => {
    try{
      const response = await axios.post(`https://ivory-llama-451678.hostingersite.com/api/comments`,{
        content:newContent,
        image_id:photo.id,
        user_id: localStorage.getItem('userId'),
      });
      console.log("Comment added successfully:",response.data);
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  const updateComment = async (commentId:number, newContent:string) => {
    try {
      const response = await axios.post(`https://ivory-llama-451678.hostingersite.com/api/comments/${commentId}`, {
        content: newContent,
      });
      console.log('Comment updated:', response.data);
      alert('Comment updated successfully');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const deleteComment = async (commentId:number) => {
    try{
      const response = await axios.delete(`https://ivory-llama-451678.hostingersite.com/api/comments/${commentId}`)
      console.log(response.data);
      window.location.reload();
    } catch(error) {
      console.error("Error deleting comment", error)
    }
  }

  if (!photo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>{photo.title}</DialogTitle>
          <DialogDescription>
            Uploaded by {photo.uploader.name} on {photo.date.split('T')[0]}
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
                    <p className="font-semibold">{comment.user.name}</p>
                    {isLoggedIn && currentUser === comment.user.name && (
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

