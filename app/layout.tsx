import type { Metadata } from 'next'
import Navbar from './Navbar'
import './global.css'
import { Fira_Code, Roboto } from 'next/font/google'
import Link from 'next/link'
import HackerText from './HackerText'

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

const roboto = Roboto({
  variable: '--font-roboto',
  weight: '400',
  subsets: ['latin'],
})

const RootLayout = ({ children }: Props) => {
  const currentYear = new Date(Date.now()).getFullYear()

  return (
    <html lang="en">
      <body className={firaCode.variable + ' ' + roboto.variable}>
        <header>
          <Link href="/">
            <h1>
              <HackerText text="FeiLong = () =&gt;" />
            </h1>
          </Link>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>© {currentYear} Jean Huynh. All Rights Reserved.</footer>
      </body>
    </html>
  )
}

export default RootLayout
