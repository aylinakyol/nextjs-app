import { GetStaticProps } from 'next';
import { getCategories } from '@/lib/api';

interface CategoryProps {
  categories: any[];
}

export default function HomePage({ categories }: CategoryProps) {
  return (
    <main>

    <h2 className='heading-center'>Kategoriler</h2>
    <ul>
    {categories.map((category) => (
        <li key={category.id}>
        <a href={`/category/${category.slug}`} className="post-link">
            {category.name}
        </a>
        </li>
    ))}
    </ul>


    </main>
  );
}

export const getStaticProps: GetStaticProps<CategoryProps> = async () => {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
    revalidate: 60,
  };
};
