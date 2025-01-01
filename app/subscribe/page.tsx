'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState<string>("");

  // Update the selected file state when the user selects a file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

  const handleText = (e:React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setImageTitle(title);
  }

  // Upload the selected file
  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const formData = new FormData();
  
    formData.append('image', selectedFile); // Append the selected image
    formData.append('user_id', userId); // Append the user ID
    formData.append('title', imageTitle);

    try {
      const response = await axios.post('http://localhost:8000/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Image uploaded successfully:', response.data);
      alert('Image uploaded successfully!');

    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      alert('Image upload failed. Check the console for more details.');
    }
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
      <br></br>
      <Input type="text" onChange={handleText} placeholder='Image Title'/>
    </div>
  );
};

export default UploadImage;
