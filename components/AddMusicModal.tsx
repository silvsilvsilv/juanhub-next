import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogOverlay
} from "@/components/ui/dialog"

import { AddMusicButton } from "./AddMusicButton";

export function AddMusicModal() {
    
    return(
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <AddMusicButton />
                </DialogTrigger>
                <DialogOverlay className="fixed inset-0 bg-black/50" />
                <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg text-white w-96 shadow-lg">
                    <DialogTitle className="text-lg font-bold">Add Music</DialogTitle>
                    <DialogDescription className="text-sm text-gray-400">
                    Fill out the details below to add a new track.
                    </DialogDescription>
                    {/* Add form inputs here */}
                    <div className="mt-4 flex justify-end space-x-2">
                    <DialogClose asChild>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">Cancel</button>
                    </DialogClose>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md">Add</button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}