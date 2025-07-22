const PAYLOAD_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : `${process.env.NEXT_PUBLIC_SITE_URL}/api`;




export async function getLatestPosts() {
  const res = await fetch(`${PAYLOAD_API_URL}/posts?limit=10`);
  if (!res.ok) throw new Error('Veriler alınamadı');
  const data = await res.json();
  console.log(data);
  return data.docs;
}

export async function getCategories() {
  const res = await fetch(`${PAYLOAD_API_URL}/categories?limit=10`);
  if (!res.ok) throw new Error('Veriler alınamadı');
  const data = await res.json();
  console.log(data);
  return data.docs;
}

export async function getQuote() {
  const res = await fetch(`${PAYLOAD_API_URL}/daily-quote`);
  if (!res.ok) throw new Error('Veriler alınamadı');
  const data = await res.json();
  console.log(data); // <- bu artık doğrudan array olacak
  return data[0] || null;
}


export async function getPostBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_API_URL}/posts?where[slug][equals]=${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  
  return data.docs?.[0] || null;
}

export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`${PAYLOAD_API_URL}/categories?where[slug][equals]=${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  
  return data.docs?.[0].name || null;
}

export async function getPostsByCategorySlug(slug: string) {
  try {
    console.log('Fonksiyon başladı, slug:', slug)
    console.log('PAYLOAD_API_URL:', PAYLOAD_API_URL)

    const categoryRes = await fetch(`${PAYLOAD_API_URL}/categories?where[slug][equals]=${slug}`)
    const categoryData = await categoryRes.json()
    console.log("kategori data", categoryData);
    if (!categoryData.docs || categoryData.docs.length === 0) {
      return []
    }
    const categoryId = categoryData.docs[0].id

    const postsRes = await fetch(`${PAYLOAD_API_URL}/posts?where[category][equals]=${categoryId}`)
    const postsData = await postsRes.json()

    return postsData.docs || []
  } catch (error) {
    console.error('Hata:', error)
    return []
  }
}