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
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition mb-4">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{formattedDate || ''}</p>
      {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
      <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline mt-2 inline-block">
        Devamını oku →
      </a>
    </div>
  );
}