import { useState } from 'react';
import axios from 'axios';

const CreateAlbum = ({ userId, fetchAlbums }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateAlbum = async () => {
    if (!title) {
      alert('Album title is required');
      return;
    }

    try {
      // Send a POST request to create the album
      await axios.post('http://localhost:8000/api/albums', {
        title,
        description,
        user_id: userId, // Pass the current user's ID
      });

      alert('Album created successfully');
      
      if (fetchAlbums) fetchAlbums(); // Optionally refresh the album list
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Failed to create album');
    }
  };

  return (
    <div>
      <h2>Create New Album</h2>
      <input
        type="text"
        placeholder="Album Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleCreateAlbum}>Create Album</button>
    </div>
  );
};

export default CreateAlbum;
