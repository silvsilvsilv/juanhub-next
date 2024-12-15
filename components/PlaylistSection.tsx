// components/PlaylistSection.tsx
import { Card } from "./Card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlaylistSection({ title, playlists }: { title: string; playlists: any[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-white text-lg mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            image={playlist.image}
            title={playlist.title}
            artist={playlist.artist}
          />
        ))}
      </div>
    </div>
  );
}
