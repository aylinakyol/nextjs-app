import { GetStaticPaths, GetStaticProps } from 'next'
import { getPostBySlug, getLatestPosts } from '@/lib/api'

function SimpleRichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root?.children) return null;

  return (
    <>
      {content.root.children.map((block: any, i: number) => (
        <p key={i}>
          {block.children.map((child: any) => child.text).join(' ')}
        </p>
      ))}
    </>
  );
}

export default function PostDetail({ post }: { post: any }) {
  if (!post) return <div>Yazı bulunamadı.</div>
  

  return (
    <article className="p-8">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <SimpleRichTextRenderer content={post.content} />
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getLatestPosts()
  const paths = posts.map((post: any) => ({ params: { slug: post.slug } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string);

  if (!post) {
    return { notFound: true }; // → 404 sayfası gösterilir
  }

  return {
    props: { post },
    revalidate: 60, //ISR
  };
};
