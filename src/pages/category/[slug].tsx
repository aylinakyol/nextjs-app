import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostsByCategorySlug } from '@/lib/api'

export default function CategoryPage({ posts, slug }: { posts: any[], slug: string }) {
  console.log(posts);
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Kategori: {slug}</h1>
      <ul className="space-y-2">
        {posts.length === 0 && <li>Bu kategoriye ait post bulunamadı.</li>}
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`} className="text-blue-600 underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('getStaticProps çağrıldı, slug:', params?.slug)
  const slug = params?.slug as string
  const posts = await getPostsByCategorySlug(slug)
  return { props: { posts, slug }, revalidate: 60 } //ISR
}