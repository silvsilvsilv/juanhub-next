import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "./ui/loading-button"

interface LoginFormProps {
  className:string;
  handleLogin: (e:React.FormEvent) => void;
  handleUser: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: {
    password:string;
    email:string;
  }
  isLoading:boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean> >
}

export function LoginForm({
  className,
  handleLogin,
  handleUser,
  user,
  isLoading,
  setIsLoading
}: LoginFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
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
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            onChange={handleUser} 
            value={user.password} 
            name="password" 
          />
        </div>
        <LoadingButton className="w-full" onClick={handleLogin} isLoading={isLoading} setIsLoading={setIsLoading}/>
        
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
