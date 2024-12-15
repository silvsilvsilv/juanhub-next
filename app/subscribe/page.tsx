'use client';

import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Update the selected file state when the user selects a file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first selected file
    setSelectedFile(file || null);
  };

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
    const title = "HELLOOOOOO";
    formData.append('image', selectedFile); // Append the selected image
    formData.append('user_id', userId); // Append the user ID
    formData.append('title',title);

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
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </button>
    </div>
  );
};

export default UploadImage;
