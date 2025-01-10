import { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumsList = ({ onSelectAlbum }) => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/albums');
      setAlbums(response.data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
      alert('Failed to fetch albums');
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <h3>{album.title}</h3>
            <p>{album.description}</p>
            <button onClick={() => onSelectAlbum(album.id)}>View Album</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumsList;
