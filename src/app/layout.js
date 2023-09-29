import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prompt Form',
  description: 'Generated Awesome Forms with ChatGPT API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <div className="mb-40 md:mb-28"></div>
        {children}
      </body>
    </html>
  )
}
