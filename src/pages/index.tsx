import PostCard from '../components/PostCard';
import DailyQuote from '@/components/DailyQuote';
import { GetStaticProps } from 'next';
import { getLatestPosts } from '../lib/api';
import useTheme from '../lib/useTheme';
import '../styles/globals.css';

interface HomePageProps {
  posts: any[];
}

export default function HomePage({ posts }: HomePageProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <DailyQuote />

      <h2 className="text-2xl font-bold mb-6">Son Yazılar</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getLatestPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};
