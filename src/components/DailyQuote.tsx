// pages/daily-quote.tsx
import { GetStaticProps } from 'next';

type Quote = {
  q: string;
  a: string;
  h: string;
};

type Props = {
  quote: string;
  author: string;
};

export default function DailyQuote({ quote, author }: Props) {
  return (
    <blockquote
      style={{
        fontStyle: 'italic',
        borderLeft: '4px solid #ccc',
        margin: '1rem',
        paddingLeft: '1rem',
      }}
    >
      "{quote}" — <footer>{author}</footer>
    </blockquote>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.PAYLOAD_API_URL}/daily-quote`);
    if (!res.ok) throw new Error('Veri alınamadı');
    const data: Quote[] = await res.json();
    const daily = data[0];

    return {
      props: {
        quote: daily?.q || 'Alıntı bulunamadı',
        author: daily?.a || 'Bilinmeyen',
      },
      revalidate: 86400, // 1 gün (isteğe bağlı)
    };
  } catch (error) {
    return {
      props: {
        quote: 'Alıntı alınamadı.',
        author: '',
      },
    };
  }
};
