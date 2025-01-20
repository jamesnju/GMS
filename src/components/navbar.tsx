'use client'

import { Bell, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export function Navbar() {
  const { toggleSidebar } = useSidebar()
  const path = usePathname()
  const {data: session } = useSession();
  console.log(session);
  

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className={`block py-2 ${path.split("/")[1] == href.split("/")[1] && "bg-secondary300"} hover:bg-secondary300 transition-all duration-300 px-2`}>{children}</Link>
)

  return (
    <nav className="bg-[#65a30d] px-4 py-2.5 flex justify-between w-full fixed z-50">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#4d7c0f] mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {/* <NavItem href="/dashboard">dashboard</NavItem> */}

      <div className="flex flex-end justify-end ">
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#4d7c0f]">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> signOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

