"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import axios from "axios"
import { useRouter } from "next/navigation"

interface User {
  email:string
  name:string
  profile_image:string
}

interface Password{
  password:string;
  confirmPass:string;
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user:{
    email:string
    name:string
    profile_image:string
  }
  password:{
    password:string
    confirmPass:string
  }
  setUser:  React.Dispatch<React.SetStateAction<User> >
  setPassword:  React.Dispatch<React.SetStateAction<Password> >
}


export function EditProfileModal({ isOpen, onClose, user, password, setUser, setPassword }: EditProfileModalProps) {

//   const [profilePicture, setProfilePicture] = useState("")
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useRouter();

  const handleDeleteAccount = () => {
    // Here you would typically handle the account deletion logic
    console.log("Account deleted")
    setIsDeleteAccountDialogOpen(false)
    onClose()

    const userId = localStorage.getItem('userId');
    const id = parseInt(userId || "0") ;
    onDelete(id);

    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_image')
    localStorage.removeItem('profile')
    router.push("/");
  }

  const onDelete = async (id: number) => {
    try {
      await axios.delete(`https://ivory-llama-451678.hostingersite.com/api/users/${id}`);
      window.location.reload()
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };


  const userInitial = user.name.slice(0,1).toUpperCase();

  // Handler for input changes
  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPassword({
      ...password,
      [id]: value,
    });
  };

  const passwordsMatch = password && password.password !== password.confirmPass

  const handleUpdate = async (e:  React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      if (password) {
        formData.append("password", password.password);
      }
      if (selectedFile) {
        formData.append("profile_image", selectedFile);
      }

      const userId = localStorage.getItem('userId');
      const response = await axios.post(
        `https://ivory-llama-451678.hostingersite.com/api/users/${userId}/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      setPreviewUrl("");
      console.log(response.data); 
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }

    console.log("Profile updated")
    onClose()

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    // Generate a preview URL for the file
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdate} method="PUT">
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`${user.profile_image? `https://ivory-llama-451678.hostingersite.com/storage/${user.profile_image}`: previewUrl}`} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={user.name}
                onChange={handleUser}
                className="col-span-3"
                name="name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={handleUser}
                className="col-span-3"
                name="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                New Password
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                  id="password"
                  type="password"
                  value={password.password}
                  onChange={handlePassword}
                  name="password"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Confirm Password
              </Label>
              <div className="col-span-3 space-y-2">
                <Input
                    id="confirmPass"
                    type="password"
                    value={password.confirmPass}
                    onChange={handlePassword}
                    className="col-span-3"
                />
                <p className={`text-sm text-red-500 ${passwordsMatch ? "block" : "hidden"}`}>
                    Passwords do not match
                </p>
              </div>  
            </div>
            
          </div>
          <DialogFooter>
            <Button type="submit" disabled={passwordsMatch}>Save changes</Button>
          </DialogFooter>
        </form>
        <div className="mt-6">
          <Button
            variant="destructive"
            onClick={() => setIsDeleteAccountDialogOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </DialogContent>
      <AlertDialog open={isDeleteAccountDialogOpen} onOpenChange={setIsDeleteAccountDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-800">
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}

