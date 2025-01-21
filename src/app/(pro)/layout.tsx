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
          <div className="flex w-screen  bg-Background overflow-y-scroll">
            <AppSidebar />
            <div className="flex-1 flex flex-col">

              <Navbar />
              <main className="flex-1 bg-background mt-24 mb-8 mx-20   ">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        </NextAuthSessionProvider>
  )
}

