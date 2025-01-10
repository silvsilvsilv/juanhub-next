'use client'

import { useEffect, useState } from 'react';
import CreateAlbum from './handleAlbum';
import axios from 'axios';

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const userId = localStorage.getItem('userId')

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/albums?user_id=${userId}`);
      setAlbums(response.data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <CreateAlbum userId={userId} fetchAlbums={fetchAlbums} />
      <h2>Your Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <h1>{album.title}</h1>
            <p>{album.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsPage;
