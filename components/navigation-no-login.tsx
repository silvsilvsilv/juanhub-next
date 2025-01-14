'use client'

import { Button } from "@/components/ui/button"
import { LogIn } from 'lucide-react'

import DBIcon from "@/components/ui/dbicon";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link"
import { useRouter } from "next/navigation";

const jetbrains = JetBrains_Mono({
  weight:['400','700'],
  subsets:['latin'],
  display:'swap',
});

export function Navigation() {

  const router = useRouter();
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/login"><DBIcon /></Link>
        <h1 className={`text-2xl font-bold text-zinc-900 ${jetbrains.className}`}>
            <Link href="/login">Juan Hub</Link>
        </h1>
        
      </div>
      <div className="flex items-center space-x-4">
        <Button 
            variant="outline" 
            onClick={() => router.push('/login') }
            className="font-semibold"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
      </div>
    </div>
  )
}

