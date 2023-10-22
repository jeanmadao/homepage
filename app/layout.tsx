import type { Metadata } from 'next'
import Navbar from './Navbar'
import './global.css'

export const metadata: Metadata = {
  title: 'Feilong Homepage',
  description: 'Welcome to my homepage!',
}

interface Props {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  const currentYear = new Date(Date.now()).getFullYear()

  return (
    <html lang="en">
      <body>
        <header>
          <h1>FeiLong&apos;s Homepage</h1>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>© {currentYear} Jean Huynh. All Rights Reserved.</footer>
      </body>
    </html>
  )
}

export default RootLayout
