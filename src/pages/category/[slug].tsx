import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostsByCategorySlug } from '@/lib/api'
import { getCategoryBySlug } from '@/lib/api'

export default function CategoryPage({ posts, category }: { posts: any[], category: any }) {

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Kategori: {category}</h1>
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
  const slug = params?.slug as string
  const category = await getCategoryBySlug(slug);
  console.log(category);
  const posts = await getPostsByCategorySlug(slug);
  return { props: { posts, category }, revalidate: 60 } //ISR
}