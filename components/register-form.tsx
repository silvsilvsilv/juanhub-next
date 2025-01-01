import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={props.handleRegister}>
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
            onChange={props.handleUser} 
            value={props.user.name} 
            name="name" 
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@email.com" 
            required 
            onChange={props.handleUser} 
            value={props.user.email} 
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
            placeholder="Minimum of 8 characters" 
            required 
            onChange={props.handleUser} 
            value={props.user.password} 
            name="password" 
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Password</Label>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            onChange={props.handleUser} 
            value={props.user.confirmPass} 
            name="confirmPass" 
          />
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
        
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
