import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import RegisterModel from './components/modals/RegisterModal'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './action/getCurrentUser'
import SearchModal from './components/modals/SearchModal'
import ContactModal from './components/modals/ContactModel'
import BlogModal from './components/modals/BlogModal'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blogifier your blogs',
  description: 'Blogifier',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModel />
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <BlogModal />
          <LoginModal/>
         <RegisterModal/>
         <ContactModal />
        <Navbar currentUser={currentUser}/> 
        
        </ClientOnly>
        <div className="pt-28 pb-20">         
          {children}
        </div>
      </body>
    </html>
  )
}
