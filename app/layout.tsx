import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  display: 'swap',
})

export const metadata = {
  title: 'Huba Atif - Software Engineer, UI/UX Designer & Marketer',
  description: 'I craft digital experiences where beautiful design meets powerful functionality, helping businesses connect meaningfully with their audiences.',
  keywords: ['software engineer', 'ui ux designer', 'marketer', 'portfolio', 'web development', 'digital design'],
  authors: [{ name: 'Huba Atif' }],
  creator: 'Huba Atif',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hubaatif.com',
    title: 'Huba Atif - Software Engineer, UI/UX Designer & Marketer',
    description: 'I craft digital experiences where beautiful design meets powerful functionality, helping businesses connect meaningfully with their audiences.',
    siteName: 'Huba Atif',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huba Atif - Software Engineer, UI/UX Designer & Marketer',
    description: 'I craft digital experiences where beautiful design meets powerful functionality, helping businesses connect meaningfully with their audiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f8f6f3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}