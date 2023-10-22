import Navlink from './Navlink'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <Navlink href="/" name="Home" />
        <Navlink href="/about" name="About" />
        <Navlink href="/blog" name="Blog" />
        <Navlink href="/contact" name="Contact" />
      </ul>
    </nav>
  )
}

export default Navbar
