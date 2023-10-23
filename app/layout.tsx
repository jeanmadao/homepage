import type { Metadata } from 'next'
import Navbar from './Navbar'
import './global.css'
import { Fira_Code } from 'next/font/google'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Feilong Homepage',
  description: 'Welcome to my homepage!',
}

interface Props {
  children: React.ReactNode
}
const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
})

const RootLayout = ({ children }: Props) => {
  const currentYear = new Date(Date.now()).getFullYear()

  return (
    <html lang="en">
      <body className={firaCode.variable}>
        <header>
          <Link href="/">
            <h1>FeiLong = () =&gt;</h1>
          </Link>
          <Navbar />
        </header>
        <main>{children}</main>
        <hr />
        <footer>© {currentYear} Jean Huynh. All Rights Reserved.</footer>
      </body>
    </html>
  )
}

export default RootLayout
