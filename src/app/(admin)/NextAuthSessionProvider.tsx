"use client"
import ReduxProvider from '@/provider/reduxProvider'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const NextAuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider><SessionProvider>{children}</SessionProvider> </ReduxProvider>
    )
}

export default NextAuthSessionProvider