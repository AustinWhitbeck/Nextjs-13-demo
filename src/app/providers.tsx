'use client'


// ** NOTES ** //

/*

    This is a CLIENT SIDE ONLY session provider. Needs to wrap components.

*/

import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}