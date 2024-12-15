// pages/index.tsx
'use client';


import { MusicTabs } from "@/components/Tabs";
import { PlaylistSection } from "@/components/PlaylistSection";
import { AddMusicModal } from "@/components/AddMusicModal";

const playlists = [
  { id: 1, image: "/react-rendezvous.jpg", title: "React Rendezvous", artist: "Ethan Byte" },
  { id: 2, image: "/async-awakenings.jpg", title: "Async Awakenings", artist: "Nina Netcode" },
  { id: 3, image: "/art-reusability.jpg", title: "The Art of Reusability", artist: "Lena Logic" },
  { id: 4, image: "/stateful-symphony.jpg", title: "Stateful Symphony", artist: "Beth Binary" },
];

export default function Upload() {

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <MusicTabs />
        <AddMusicModal />
      </div>

      {/* Playlist Sections */}
      <div className="mt-8">
        <PlaylistSection title="Listen Now" playlists={playlists} />
        <PlaylistSection title="Made for You" playlists={playlists} />
      </div>
    </div>
  );
}
