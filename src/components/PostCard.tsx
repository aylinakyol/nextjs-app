import { useState, useEffect } from "react";

type Post = {
  title: string;
  content: any;
  slug: string;
  createdAt: string;
  excerpt?: string;
};

function SimpleRichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root?.children) return null;

  return (
    <div>
      {content.root.children
        .filter((block: any) => block.type === 'heading')
        .map((block: any, i: number) => {
          const Tag = block.tag || 'h2'; // varsayılan h2
          return (
            <Tag key={i}>
              {block.children.map((child: any, j: number) => (
                <span key={j}>{child.text + '...'}</span>
              ))}
            </Tag>
          );
        })}
    </div>
  );
}


export default function PostCard({ post }: { post: Post }) {
  // Tarih formatlamayı client-side'da yapmak için useEffect kullanıyoruz
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(post.createdAt).toLocaleDateString());
  }, [post.createdAt]);

  return (
    <div className="post-card">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{formattedDate}</p>
      <SimpleRichTextRenderer content={post.content} />
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      <a href={`/posts/${post.slug}`} className="post-link">
        Read More →
      </a>
    </div>

  );
}