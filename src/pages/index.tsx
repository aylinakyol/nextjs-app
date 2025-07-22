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

      <h1 className='head-underline'>Latest Posts</h1>
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
