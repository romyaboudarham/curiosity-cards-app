import "./globals.css";

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