'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface Comment {
  id: number
  user_id: number
  content: string
  created_at: string
  image_id:number
  isEditing?: boolean
  replies:[Comment]
}

export default function Test({id=2}) {

  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchComments = async () =>{
      try {
        const imageId = id;
        const response = await axios.get(`https://ivory-llama-451678.hostingersite.com/api/images/${imageId}/comments`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
          console.error('Error fetching comments:', error);
      }
    }
  
    fetchComments();
  }, [id])

  return(
    <>
      <div>
        {comments.map((comment) => (<p key={comment.id}>{comment.content}</p>) )}
      </div>
    </>
    
  );

}