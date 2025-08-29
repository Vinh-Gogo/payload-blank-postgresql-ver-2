import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Medias',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    formatOptions: {
      format: 'webp',
    },
    imageSizes: [
      {
        name: 'small',
        width: 1200,
        height: 800,
      },
    ],
    mimeTypes: ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'],
    adminThumbnail: 'small'
    // adminThumbnail: ({doc}) => `https://google.com/path/to/file/${doc.id}`
  },
}
