import HackerText from '@/app/HackerText'

interface Params {
  slug: string
}

interface Props {
  params: Params
}
const BlogPost = ({ params }: Props) => {
  return (
    <>
      <h2>
        <HackerText text={params.slug} />
      </h2>
    </>
  )
}

export default BlogPost
