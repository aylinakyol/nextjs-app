import { useEffect, useState } from 'react';

export default function GununSozu() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/daily-quote')
      .then((res) => {
        if (!res.ok) throw new Error('Veri alınamadı');
        return res.json();
      })
      .then((data) => {
        setQuote(data[0].q);
        setAuthor(data[0].a);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <blockquote style={{ fontStyle: 'italic', borderLeft: '4px solid #ccc', margin: '1rem', paddingLeft: '1rem' }}>
      "{quote}" — <footer>{author}</footer>
    </blockquote>
  );
}
