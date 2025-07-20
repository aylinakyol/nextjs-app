type Post = {
  title: string;
  slug: string;
  createdAt: string;
  excerpt?: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
      {post.excerpt && <p className="mt-2 text-gray-700">{post.excerpt}</p>}
      <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline mt-2 inline-block">
        Devamını oku →
      </a>
    </div>
  );
}
