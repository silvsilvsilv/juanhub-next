import { useState } from 'react';
import axios from 'axios';

const CreateAlbum = ({ fetchAlbums }) => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateAlbum = async () => {
    if (!albumTitle) {
      alert('Album title is required');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/albums', {
        title: albumTitle,
        description,
      });

      alert('Album created successfully');
      setAlbumTitle('');
      setDescription('');
      fetchAlbums(); // Refresh the albums list
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Failed to create album');
    }
  };

  return (
    <div>
      <h2>Create Album</h2>
      <input
        type="text"
        placeholder="Album Title"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleCreateAlbum}>Create Album</button>
    </div>
  );
};

export default CreateAlbum;
