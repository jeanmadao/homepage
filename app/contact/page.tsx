import HackerText from '../HackerText'

const Contact = () => {
  return (
    <>
      <h2>
        <HackerText text="Contact();" />
      </h2>

      <section>
        <p>Here&apos;s how you can contact me!</p>

        <address>
          <a href="mailto:huynhjeanpierre@hotmail.com">
            huynhjeanpierre@hotmail.com
          </a>
          <br />
          <a href="tel:+32488016546">+32488016546</a>
        </address>
      </section>
    </>
  )
}

export default Contact
