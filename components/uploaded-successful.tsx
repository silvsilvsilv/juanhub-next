"use client"

import { Button } from "@/components/ui/button"
import { CircleCheckBig } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessfulUploadModal({ isOpen, onClose }: UploadModalProps) {

    const handleConfirmNavigation = () => {
        onClose();
        // router.push("/login");
    }

  return (
    <Dialog open={isOpen} onOpenChange={handleConfirmNavigation}>
      <DialogContent className="sm:max-w-[425px] bg-white py-12">
        <DialogHeader className="items-center">
          <CircleCheckBig className="mb-5 h-10 w-10"/>
          <DialogTitle className="text-3xl">Success</DialogTitle>
          <DialogDescription>
           Your photo was uploaded sucessfully!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" onClick={handleConfirmNavigation}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

