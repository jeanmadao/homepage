import { Suspense } from 'react'
import BlogLoading from './loading'
import BlogList from './BlogList'

const Blog = () => {
  return (
    <>
      <h2>Blog();</h2>

      <section>
        <Suspense fallback={<BlogLoading />}>
          <BlogList />
        </Suspense>
      </section>
    </>
  )
}

export default Blog
