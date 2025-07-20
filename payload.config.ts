import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import Posts from '@/app/(payload)/collections/Posts'
import Authors from '@/app/(payload)/collections/Authors'
import Categories from '@/app/(payload)/collections/Categories'
import SiteSettings from '@/app/(payload)/collections/SiteSettings'
import Media from '@/app/(payload)/collections/Media'


export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Posts, Categories, Authors, Media],
  globals: [SiteSettings],
  endpoints: [
    {
      path: '/daily-quote',
      method: 'get',
      handler: async (req) => {
        try {
          const response = await fetch('https://zenquotes.io/api/today');
          if (!response.ok) {
            return Response.json({ error: 'Zen Quotes API hatası' }, { status: response.status });
          }

          const data = await response.json();  // sadece 1 kere çağır

          console.log('Zen Quotes API data:', data);
          return Response.json(data);
          
        } catch (error: unknown) {
          console.error('Hata:', error);
          let message = 'Bilinmeyen hata';

          if (error instanceof Error) {
            message = error.message;
          }

          return Response.json({ error: 'Something went wrong.', details: message }, { status: 500 });
        }
      },
    },
  ],
  

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',

  cors: ['http://localhost:3000'], // Next.js frontend adresin
  

  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})