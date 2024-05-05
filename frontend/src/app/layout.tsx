import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const appFont = Inter( {
  subsets: [ 'latin' ],
  variable: '--font-sans',
} )

export const metadata: Metadata = {
  description: 'Next app',
  title: 'Kanban',
}

export default function RootLayout( { children }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang='en' suppressHydrationWarning={ true }>
      <body
        className={ cn(
          'min-h-screen bg-background font-sans antialiased',
          appFont.variable,
        ) }
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
