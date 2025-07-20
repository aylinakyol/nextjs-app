import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
      read: () => true
  },
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
      relationTo: 'authors',
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
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.content) {
          const html = lexicalHTML(data.content, {
            name: ""
          })
          data.contentHTML = html
        }
        return data
      },
    ],
  },
};

export default Posts;
