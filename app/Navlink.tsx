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
      {pathname === href && <span className="navlink active">{name}</span>}
      {pathname !== href && (
        <Link className={`navlink inactive`} href={href}>
          {name}
        </Link>
      )}
    </li>
  )
}

export default Navlink
