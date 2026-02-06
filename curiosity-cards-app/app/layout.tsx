import "./globals.css";
import { Inria_Sans } from 'next/font/google'

const inriaSans = Inria_Sans({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
    title:'Curiosity Cards',
    description: 'Curious? Instantly make flashcards on it',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-surface-background text-text-body" suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}