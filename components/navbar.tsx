"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, LogOut, Home, Edit } from "lucide-react"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-[#243831]">
      <div className="flex h-16 items-center justify-between mx-5 md:mx-16">
        <Link href="/" className="flex items-center space-x-2">
          <h1 className="text-white font-castoro text-3xl leading-[100%] font-normal italic ml-5">
            a Board
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white">
                {user.username}
              </span>
              <div className="flex items-center space-x-2">
                <Image
                  src="https://i.pravatar.cc/300"
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <LogOut className="ml-4 cursor-pointer text-white h-4 w-4 mr-2" onClick={logout} />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="success">Sign In</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="text-white h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#243831] border-0">
              <div className="flex flex-col space-y-4 mt-12 mx-5">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-white ${pathname === "/" ? "font-bold" : ""
                      }`}
                  >
                    <Home className="text-white size-4" /><span>Home</span>
                  </Button>
                </Link>
                {user && (
                  <Link href="/our-blogs" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-white ${pathname === "/our-blogs" ? "font-bold" : ""
                        }`}
                    >
                    <Edit className="text-white size-4" /><span>Our Blog</span>
                  </Button>
                  </Link>
                )}

                <hr className="border-gray-600 my-6" />
                {user ? (
                  <>
                    <Button variant="outline" onClick={logout} className="w-full">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
