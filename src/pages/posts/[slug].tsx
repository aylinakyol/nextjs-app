  import { GetStaticPaths, GetStaticProps } from 'next';
  import { getPostBySlug, getLatestPosts } from '@/lib/api';
  import Head from 'next/head';
  

  interface PostDetailProps {
    post: any;
  }

 function SimpleRichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root?.children) return null;

  return (
    <div>
      {content.root.children.map((block: any, i: number) => {
        switch (block.type) {
          case 'heading':
            const Tag = block.tag || 'h2';
            return (
              <Tag key={i}>
                {block.children.map((child: any, j: number) => (
                  <span key={j}>{child.text + " ="}</span>
                ))}
              </Tag>
            );

          case 'paragraph':
            return (
              <p key={i}>
                {block.children.map((child: any, j: number) => (
                  <span key={j}>{child.text}</span>
                ))}
              </p>
            );

          case 'list':
            const ListTag = block.listType === 'number' ? 'ol' : 'ul';
            return (
              <ListTag key={i}>
                {block.children.map((item: any, j: number) => (
                  <li key={j}>
                    {item.children.map((child: any, k: number) => (
                      <span key={k}>{"- " + child.text}</span>
                    ))}
                  </li>
                ))}
              </ListTag>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}


  export default function PostDetail({ post }: PostDetailProps) {

    if (!post) return <div className="text-center mt-10">Post is not found.</div>;

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
