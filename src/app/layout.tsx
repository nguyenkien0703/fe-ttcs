import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'
import GlobalProvider from '@/global-provider'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export const metadata: Metadata = {
    title: 'Laptop Application',
    description: 'Laptop Application manage laptop in shop',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={roboto.className}>
                <GlobalProvider>{children}</GlobalProvider>
            </body>
        </html>
    )
}
