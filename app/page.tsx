import Link from "next/link"
import { Package2 } from "lucide-react"

// import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



import Homepage from "@/components/Homepage"


// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import AuthorCard from "@/components/ui/author-card"

function Home() {
  return (
    // Navbar
     <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 mb-8">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 text-nowrap">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Juan Hub</span>
          </Link>
          <Link
            href="#about"
            className="text-foreground transition-colors hover:text-foreground"
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
        
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative space-x-4">
              <Link href="">
                <Button variant="secondary">
                  Join
                </Button>
              </Link>

              <Link href="">
                <Button>
                  Learn
                </Button>
              </Link>
            </div>
          </form>
          
        </div>
      </header>

      <main>
        <Homepage/>
         
      </main>
     
    </div>
  )
}

export default Home;

