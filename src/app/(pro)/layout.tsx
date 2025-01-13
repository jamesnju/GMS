// import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { AppSidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={false}>
          <div className="flex h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden ">
              <Navbar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}

