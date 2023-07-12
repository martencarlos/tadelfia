import './globals.css'
import { Inter } from 'next/font/google'
import  Navbar from '@/components/navbar/navbar'
import  Footer from '@/components/footer/footer'
import styles from './layout.module.css'
import AuthProvider from "@/components/authProvider/authProvider";
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tadelfia',
  description: 'Villas in Tadelfia',
}


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      
      
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-NLD045G618"/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLD045G618', {
              page_path: window.location.pathname,
            });
          `,
          }}
      />
      
     
      <body className={inter.className}>
        <Navbar/>
        <AuthProvider>
          <main className={styles.website}>
          {children}
          </main>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  )
}
