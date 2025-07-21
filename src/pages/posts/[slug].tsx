  import { GetStaticPaths, GetStaticProps } from 'next';
  import { getPostBySlug, getLatestPosts } from '@/lib/api';
  import { useEffect } from 'react';
  import useTheme from '@/lib/useTheme';
  import Head from 'next/head';
  

  interface PostDetailProps {
    post: any;
  }

  function SimpleRichTextRenderer({ content }: { content: any }) {
    if (!content || !content.root?.children) return null;

    return (
      <div className="space-y-4 mt-6">
        {content.root.children.map((block: any, i: number) => (
          <p key={i}>
            {block.children.map((child: any) => child.text).join(' ')}
          </p>
        ))}
      </div>
    );
  }

  export default function PostDetail({ post }: PostDetailProps) {
    const { theme, toggleTheme } = useTheme();
    useEffect(() => {
      // İstemci tarafında HTML sınıfını güncelle
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    if (!post) return <div className="text-center mt-10">Yazı bulunamadı.</div>;

    return (
      <>
        <Head>
          <title className='post-title'>{post.title} | Blog</title>
        </Head>

        <main className='post-card'>
          <h1 className="heading-center">
            {post.title}
          </h1>

          <SimpleRichTextRenderer content={post.content} />
        </main>
      </>
    );
  }

  export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getLatestPosts();

    const paths = posts.map((post: any) => ({
      params: { slug: post.slug },
    }));

    return { paths, fallback: 'blocking' };
  };

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 60,
    };
  };
