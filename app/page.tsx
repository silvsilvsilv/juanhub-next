import Link from "next/link"
// import { Ham } from "lucide-react";
// import { Package2 } from "lucide-react"

// import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import DBIcon from "../components/ui/dbicon";

import Homepage from "@/components/Homepage"
import Footer from "@/components/Footer"


// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import AuthorCard from "@/components/ui/author-card"

function Home() {
  return (
    // Navbar
     <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 mb-8">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 text-nowrap">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base phone:text-base"
          >
            <DBIcon/>
            <span className="font-['JetBrains_Mono']">Juan Hub</span>
            <span className="sr-only">Juan Hub</span>
          </Link>

          <Link
            href="/"
            className="text-foreground transition-colors hover:text-white hover:bg-black"
          >
            Home
          </Link>

          <Link
            href="#about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About Us
          </Link>
          
          <Link
            href="#contact"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact Us
          </Link>
        </nav>

        <div className="flex desktop:hidden phone:flex">
          <DBIcon/>
        </div>
        
        <div className="w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 phone:hidden desktop:flex">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative space-x-4">
              <Link href="/register">
                <Button variant="secondary" className="bg-white outline outline-1 outline-black">
                  Join
                </Button>
              </Link>

              <Link href="/login">
                <Button>
                  Log In
                </Button>
              </Link>
            </div>
          </form>
          
        </div>
      </header>

      <main>
        <Homepage/>
      </main>

      <Footer/>
    </div>
  )
}

export default Home;

