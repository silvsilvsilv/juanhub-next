// 'use client'

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const AlbumsList = ({ onSelectAlbum }) => {
//   const [albums, setAlbums] = useState([]);

//   const fetchAlbums = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/albums');
//       setAlbums(response.data.albums);
//     } catch (error) {
//       console.error('Error fetching albums:', error);
//       alert('Failed to fetch albums');
//     }
//   };

//   useEffect(() => {
//     fetchAlbums();
//   }, []);

//   return (
//     <div>
//       <h2>Albums</h2>
//       <ul>
//         {albums.map((album) => (
//           <li key={album.id}>
//             <h3>{album.title}</h3>
//             <p>{album.description}</p>
//             <button onClick={() => onSelectAlbum(album.id)}>View Album</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AlbumsList;
'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const AlbumImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/albums/1/images`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h1>Album Images</h1>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img src={`http://localhost:8000/storage/${image.path}`} alt={image.title} />
                        <p>{image.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumImages;
