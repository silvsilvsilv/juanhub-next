import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button";

interface RegisterFormProps {
  className:string;
  handleRegister: (e:React.FormEvent) => void;
  handleUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: {
    name:string;
    password:string;
    email:string;
    confirmPass:string;
  }
  isEmpty:{
    name:boolean;
    email:boolean;
    password:boolean;
    confirmPass:boolean;
  }
}

export function RegisterForm({
  className,
  handleRegister,
  handleUser,
  user,
  isEmpty
}: RegisterFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)}  onSubmit={handleRegister}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your name, email and password below to create your account
        </p>
      </div>
      <div className="grid gap-6">

        <div className="grid gap-2">
          <Label htmlFor="email">Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            onChange={handleUser} 
            value={user.name} 
            name="name" 
            className={`${isEmpty.name ?'border-red-500':''}`}
          />
          <Label className={`${isEmpty.name ?'text-red-500':'hidden'}`}>Name cannot be empty</Label>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@email.com" 
            required 
            onChange={handleUser} 
            value={user.email} 
            name="email" 
            className={`${isEmpty.email ?'border-red-500':''}`}
          />
          <Label className={`${isEmpty.email ?'text-red-500':'hidden'}`}>Email cannot be empty</Label>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            id="password" 
            type="password"
            placeholder="Minimum of 8 characters" 
            required 
            onChange={handleUser} 
            value={user.password} 
            name="password" 
            className={`${isEmpty.password ?'border-red-500':''}`}
          />
          <Label className={`${isEmpty.password ?'text-red-500':'hidden'}`}>Password cannot be empty</Label>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Password</Label>
          </div>
          <Input 
            id="confirmPass" 
            type="password" 
            required 
            onChange={handleUser} 
            value={user.confirmPass} 
            name="confirmPass" 
            className={`${isEmpty.confirmPass ?'border-red-500':''}`}
          />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
        {/* <LoadingButton className="w-full" onClick={handleRegister} isLoading={isLoading} setIsLoading={setIsLoading} text={"Register"}/> */}
        
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log In
        </a>
      </div>
    </form>
  )
}
