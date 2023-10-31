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
          My full name is Jean Pierre Huynh, I&apos;m {age} years old, and I
          live in Brussels, Belgium.
        </p>

        <p>
          I mostly learned all my programming and development knowledge on the
          Internet. I owe the{" "}
          <a href="https://fullstackopen.com/en/">Full Stack Open course</a> for
          all my foundamental knowledge of web development. I really am thankful
          for all those free and open source resources available, the internet
          is truly a valueable and accessible place to learn really anything.
        </p>
      </section>
    </>
  )
}

export default About
