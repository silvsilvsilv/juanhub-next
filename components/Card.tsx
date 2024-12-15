// components/Card.tsx
export function Card({ image, title, artist }: { image: string; title: string; artist: string }) {
  return (
    <div className="w-48 p-2">
      <img src={image} alt={title} className="rounded-md object-cover w-full h-48" />
      <h3 className="text-white text-sm mt-2">{title}</h3>
      <p className="text-gray-400 text-xs">{artist}</p>
    </div>
  );
}
