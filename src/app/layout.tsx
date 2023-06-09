import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import NavMenu from './components/NavMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Austin s App Router Demo',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // This Providers component gives all client side components access to it.
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* NOTE: TypeSript is not ready for server components yet. Need to have this exception until they fix it. */}
          {/* @ts-expect-error Server Component */}
          <NavMenu />
          {children}
        </Providers>
      </body>
    </html>
  )
}
