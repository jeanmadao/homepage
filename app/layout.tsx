import type { Metadata } from "next"
import Navbar from "./Navbar"
import "./global.css"
import { Fira_Code, Roboto } from "next/font/google"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Feilong Homepage",
  description: "Welcome to my homepage!",
}

interface Props {
  children: React.ReactNode
}

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
})

const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
})

const RootLayout = ({ children }: Props) => {
  const currentYear = new Date(Date.now()).getFullYear()

  return (
    <html lang="en">
      <body className={firaCode.variable + " " + roboto.variable}>
        <header>
          <Link href="/">
            <h1>
              <span className="red">const </span>
              <span className="green"> Project </span>
              <span className="orange"> =</span>
              <br />
              <span className="orange">(</span>
              <span className="blue">FeiLong</span>
              <span className="orange">)</span>
              <span className="orange"> =&gt; </span>
              <span className="orange"> &#123;</span>
              <span className="blink">&nbsp;</span>
              <span className="orange">&#125;</span>
            </h1>
          </Link>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <small>© {currentYear} Jean Huynh. All Rights Reserved.</small>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout
