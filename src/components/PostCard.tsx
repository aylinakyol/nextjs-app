import { useState, useEffect } from "react";

type Post = {
  title: string;
  slug: string;
  createdAt: string;
  excerpt?: string;
};

export default function PostCard({ post }: { post: Post }) {
  // Tarih formatlamayı client-side'da yapmak için useEffect kullanıyoruz
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(post.createdAt).toLocaleDateString());
  }, [post.createdAt]);

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-date">{formattedDate}</p>
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      <a href={`/posts/${post.slug}`} className="post-link">
        Devamını oku →
      </a>
    </div>

  );
}