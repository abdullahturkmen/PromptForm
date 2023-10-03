import './globals.css'
import './stack.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Inter } from 'next/font/google'
import Header from './components/header'
import Author from './components/author';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PromptForm',
  description: 'ChatGPT API ile muhteşem formlar oluşturun',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <div className="mb-40 md:mb-28"></div>
        {children}
        <ToastContainer />
        <Author />
      </body>
    </html>
  )
}
