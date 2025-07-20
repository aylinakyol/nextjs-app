import { GetStaticProps } from 'next';
import { getLatestPosts } from '../lib/api'
import '../styles/globals.css'

export default function HomePage({ posts }: { posts: any[] }) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Son Yazılar</h1>
      {posts.map(post => (
        <div key={post.id} className="p-4 border rounded mb-4">
          <a href={`/posts/${post.slug}`} className="text-blue-600 underline">
            {post.title}
          </a>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLatestPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60, //ISR
  };
};
