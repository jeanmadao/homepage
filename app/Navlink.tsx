'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  href: Url
  name: string
}
const Navlink = ({ href, name }: Props) => {
  const pathname = usePathname()
  return (
    <li className="navli">
      <Link
        className={`navlink ${pathname === href ? 'active' : ''}`}
        href={href}
      >
        {name}
      </Link>
    </li>
  )
}

export default Navlink
