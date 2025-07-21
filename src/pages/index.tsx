import PostCard from '../components/PostCard';
import DailyQuote from '@/components/DailyQuote';
import { GetStaticProps } from 'next';
import { getLatestPosts } from '../lib/api';
import '../styles/globals.css';

interface HomePageProps {
  posts: any[];
}

export default function HomePage({ posts }: HomePageProps) {
  return (
    <main>
      <DailyQuote />

      <h2 className='head-underline'>Son Yazılar</h2>
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
