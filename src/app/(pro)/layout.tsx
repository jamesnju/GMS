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
          <div className="flex h-screen w-screen overflow-hidden bg-Background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">

              <Navbar />
              <main className="flex-1  bg-background mt-32 m-10 mx-24 overflow-hidden h-screen">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        </NextAuthSessionProvider>
  )
}

