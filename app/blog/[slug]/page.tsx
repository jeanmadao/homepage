interface Params {
  slug: string
}

interface Props {
  params: Params
}
const BlogPost = ({ params }: Props) => {
  return (
    <>
      <h2>Slug: {params.slug}</h2>
    </>
  )
}

export default BlogPost
