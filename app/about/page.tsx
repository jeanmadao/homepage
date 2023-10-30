const About = () => {
  const birthdate = new Date(1999, 9, 28).getTime() //Month is 0-indexed for some reason
  const today = Date.now()
  const age = Math.floor((today - birthdate) / 1000 / 60 / 60 / 24 / 365.25)

  return (
    <>
      <h2>About Me();</h2>

      <section>
        <h3>Get to know me better!</h3>

        <p>
          My full name is Jean Pierre Huynh, I'm {age} years old, and I live in
          Brussels, Belgium. I have a girlfriend, her name is Xin Huang, she
          very hot, and she crazy brooooooooo. Like me man. Woooooh.
          Woaaaaaaaaah (with mario voice).
        </p>
        <p></p>
      </section>
    </>
  )
}

export default About
