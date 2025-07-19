import { CollectionConfig } from "payload";

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      type: 'relationship',
      relationTo: 'users',
      name: 'author',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Meta Title',
          type: 'text',
          maxLength: 60,
        },
        {
          name: 'description',
          label: 'Meta Description',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'keywords',
          label: 'Meta Keywords',
          type: 'text',
        },
        {
          name: 'image',
          label: 'Meta Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'noIndex',
          label: 'No Index',
          type: 'checkbox',
        },
        {
          name: 'canonicalURL',
          label: 'Canonical URL',
          type: 'text',
        },
      ],
    },
  ],
};

export default Posts;
