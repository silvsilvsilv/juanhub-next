import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut } from 'lucide-react'
import { EditProfileModal } from "./edit-profile-modal"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios"

interface User {
  email:string
  name:string
  profile_image:string
}

interface Password{
  password:string;
  confirmPass:string;
}

export function ProfileDropdown() {
  
  const [user, setUser] = useState<User>({
    email: "",
    name: "",
    profile_image:""
  });
  const [password, setPassword] = useState<Password>({
    password:"",
    confirmPass:""
  }) 
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  const router = useRouter();
    
  useEffect(() => {
    const user = localStorage.getItem('userId');

    if(!user){
      router.push('/login');
    }
    
    updateUserInfo();

    const currentUser:User = { 
      email: localStorage.getItem('email') || "", 
      name: localStorage.getItem('name') || "",
      profile_image: localStorage.getItem('profile') || ""
    };

    setUser(currentUser);

  }, [router])

  const handleLogout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
        
    router.push('/');
  }

  const updateUserInfo = async () =>{
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`)

      localStorage.setItem('email',`${response.data.email}`)
      localStorage.setItem('name',`${response.data.name}`)
      localStorage.setItem('profile',`${response.data.profile_image}` )

    } catch (error) {
      console.error(error);
    }
  }

  const userInitial = user.name.slice(0,1).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`http://localhost:8000/storage/${user.profile_image}`} alt="@username" />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditProfileOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} user={user} password={password} setUser={setUser} setPassword={setPassword}/>
    </>
  )
}

