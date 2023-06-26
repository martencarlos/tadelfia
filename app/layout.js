import './globals.css'
import { Inter } from 'next/font/google'
import  Navbar from '@/components/navbar/navbar'
import styles from './layout.module.css'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tadelfia',
  description: 'Villas in Tadelfia',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className={styles.website}>
        {children}
        </main>
      </body>
    </html>
  )
}
