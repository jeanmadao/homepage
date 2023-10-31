import Link from "next/link"
import profilePic from "../public/F3aWdFdaQAA-PKs.jpg"
import Image from "next/image"

const Home = () => {
  return (
    <>
      <h2>Welcome();</h2>

      <section>
        <div className="introduction">
          <div className="introduction-text">
            <h3>Let me introduce myself!</h3>
            <p>
              My name is Jean Huynh, a self-taught fullstack developer. I love
              scratching my head solving problems, especially when it comes to
              code. Always interested and in the search of new technology and
              frameworks to learn.
            </p>
            <p>
              <Link href="/contact">Let&apos;s have a talk!</Link>
            </p>
          </div>
          <aside>
            <figure>
              <Image
                src={profilePic}
                alt="Cat Avatar"
                className="profile-pic"
                placeholder="blur"
              />
              <figcaption>
                source: <a href="https://x.com/nitorisasami">@nitorisasami</a>
              </figcaption>
            </figure>
          </aside>
        </div>

        <table>
          <caption>Skills</caption>
          <thead>
            <tr>
              <th>Frontend</th>
              <th>Backend</th>
              <th>Tools</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Typescript</td>
              <td>Express</td>
              <td>Mongoose</td>
              <td>Python</td>
            </tr>
            <tr>
              <td>React</td>
              <td>GraphQL</td>
              <td>Git</td>
              <td>C</td>
            </tr>
            <tr>
              <td>React Query</td>
              <td>Supertest</td>
              <td>Linux</td>
              <td>Kotlin</td>
            </tr>
            <tr>
              <td>Redux</td>
              <td>Mongoose</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cypress</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>HTML</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>CSS</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Home
