'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data } = await axios.get('http:///127.0.0.1:8000/api/images', {
                    headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
                });
                setImages(data.map((img: { path: string }) => img.path));
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            {images.map((path, idx) => (
                <img
                    key={idx}
                    src={`http://127.0.01:8000/storage/${path}`}
                    alt={`User Image ${idx}`}
                    style={{ width: 200, height: 200 }}
                />
            ))}
        </div>
    );
};

export default Dashboard;
