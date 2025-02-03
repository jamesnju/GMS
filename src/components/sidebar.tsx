'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, CreditCard, LayoutDashboard, Settings, Users, Wrench, Package, ClipboardList, Mail, LogOut, File } from 'lucide-react'

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  // SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from 'next-auth/react'

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Service Booking', icon: Calendar, href: '/servicesBooking' },
  { name: 'My Appointments', icon: ClipboardList, href: '/appointment' },
  { name: 'Payment', icon: CreditCard, href: '/managepayment' },
  { name: 'Service Management', icon: Settings, href: '/serviceManagement' },
  { name: 'Customer Management', icon: Users, href: '/' },
  { name: 'Payment Management', icon: CreditCard, href: '/' },
  { name: 'Mechanic/Staff Management', icon: Wrench, href: '/' },
  { name: 'User Management', icon: Wrench, href: '/users' },
  { name: 'Inventory Management', icon: Package, href: '/inventoryManagement' },
  {name: 'Generate Report', icon: File, href:'/report'},
]

export function AppSidebar() {
  const pathname = usePathname()
  const { open } = useSidebar()
  const {data: session} = useSession();

  return (
    <Sidebar className={cn("border-r-0 bg-[#65a30d]", !open && "hidden md:block")}>
      <SidebarHeader className="bg-[#65a30d] py-4">
        <h2 className="text-2xl font-bold text-Text text-center">Mechanic App</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href}
                className={cn(
                  "text-white hover:bg-[#4d7c0f] hover:text-white",
                  pathname === item.href && "bg-[#4d7c0f] text-white"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4 text-black" />
                  <span className='text-Text'>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-[#4d7c0f] p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback>{session?.user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-Text">{session?.user.name}</p>
            <p className="text-xs leading-none text-Text">
              <Mail className="mr-1 h-3 w-3 inline" />
             {session?.user.email}
            </p>
          </div>
        </div>
        <Button variant="outline" className="w-full text-Text border-white hover:bg-[#4d7c0f]  
        "
        onClick={()=> signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

