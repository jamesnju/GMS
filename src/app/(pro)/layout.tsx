// import '../styles/globals.css'
// import { Inter } from 'next/font/google'
import { AppSidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import '../../../styles/globals.css'
import NextAuthSessionProvider from '../(admin)/NextAuthSessionProvider'

// const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthSessionProvider>
  <SidebarProvider defaultOpen={true}>
    <div className="flex bg-white h-screen w-screen">
      {/* Set the sidebar z-index lower than the navbar */}
      <div className="z-10">

<AppSidebar  />
</div>      
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        
        <main className="flex-1 bg-background pt-20 px-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
</NextAuthSessionProvider>

  )
}

