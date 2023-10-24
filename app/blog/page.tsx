import { Suspense } from 'react'
import BlogLoading from './loading'
import BlogList from './BlogList'
import HackerText from '../HackerText'

const Blog = () => {
  return (
    <>
      <h2>
        <HackerText text="Blog();" />
      </h2>

      <section>
        <Suspense fallback={<BlogLoading />}>
          <BlogList />
        </Suspense>
      </section>
    </>
  )
}

export default Blog
