import axios from "axios";
import { useEffect, useState } from "react";

const AlbumDetails = ({ albumId, onBack }) => {
  const [images, setImages] = useState([]);

  const fetchAlbumImages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/albums/${albumId}/images`);
      setImages(response.data.images);
    } catch (error) {
      console.error('Error fetching album images:', error);
      alert('Failed to fetch album images');
    }
  };

  useEffect(() => {
    fetchAlbumImages();
  }, [albumId]);

  return (
    <div>
      <button onClick={onBack}>Back to Albums</button>
      <h2>Album Images</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={`http://localhost:8000/storage/images/${image.path}`}
              alt={image.title}
              width={300}
            />
            <h3>{image.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetails;
