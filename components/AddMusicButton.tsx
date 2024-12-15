// components/AddMusicButton.tsx
import { PlusIcon } from "lucide-react"; 

export function AddMusicButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md shadow-sm"
    >
      <PlusIcon /> Add Music
    </button>
  );
}