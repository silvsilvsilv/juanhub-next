'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  id: number;
  user_id: number;
  title: string;
  url: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  

  useEffect(() => {
    const fetchImages = async () => {
       try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8000/api/images`, {
            params: {
                user_id: userId,
            },
            });
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {images.map((image) => (
        <div key={image.id} style={{ textAlign: 'center' }}>
          <img
            src={image.url}
            alt={image.title}
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <p>{image.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
