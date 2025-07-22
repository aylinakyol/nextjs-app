import PostCard from '../components/PostCard';
import { GetStaticProps } from 'next';
import { getLatestPosts, getQuote } from '../lib/api';
import '../styles/globals.css';

interface Quote {
  q: string;
  a: string;
  h: string;
}

interface HomePageProps {
  posts: any[];
  dailyQuote: Quote | null;
}

export default function HomePage({ posts, dailyQuote }: HomePageProps) {
  return (
    <main>

      {dailyQuote && (
        <blockquote
        style={{
          fontStyle: 'italic',
          borderLeft: '4px solid #ccc',
          margin: '2rem 1rem',
          paddingLeft: '1rem',
        }}
        >
          "{dailyQuote.q}" — <footer>{dailyQuote.a}</footer>
        </blockquote>
      )}
      <h1 className="head-underline">Latest Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getLatestPosts();

  let dailyQuote = null;
  try {
    const data = await getQuote();
    dailyQuote = data || null;
  } catch (error) {
    console.error('Quote alınamadı:', error);
  }

  return {
    props: {
      posts,
      dailyQuote,
    },
    revalidate: 60,
  };
};
