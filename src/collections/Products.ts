// collections/Products.ts

import { BoldFeature, defaultEditorFeatures, FixedToolbarFeature, HTMLConverterFeature, ItalicFeature, lexicalEditor, lexicalHTML, UnderlineFeature } from '@payloadcms/richtext-lexical'  // npx payload generate:importmap
import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Products',
    useAsTitle: 'title',
    description: 'A collection of products',
  },
  access: {
    // Chỉ admin mới có quyền truy cập vào bảng điều khiển admin
    admin: ({ req }) => !!req.user?.roles?.includes('admin'),
    // Chỉ admin và editor mới có thể tạo sản phẩm
    create: ({ req }) => authenticated({ req, roles: ['admin', 'editor'] }),
    // Mọi người đều có thể đọc
    read: () => true,
    // Chỉ admin và editor mới có thể cập nhật sản phẩm
    update: ({ req }) => authenticated({ req, roles: ['admin', 'editor'] }),
    // Chỉ admin mới có thể xóa sản phẩm
    delete: ({ req }) => authenticated({ req, roles: ['admin'] }),
  },
  defaultSort: ['createdAt', 'number', 'desc'],
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'id',
          type: 'text',
          unique: true,
          admin: {
            placeholder: 'This is a test placeholder',
            rtl: false,
            // readOnly: true,
            width: '25%',
          },
        },
        {
        name: 'title_name',
        type: 'text',
        admin: {
          width: '75%',
        }
      },
    ],
  },
  {
    name: 'number',
    type: 'number',
      admin: {
        placeholder: 'number !',
        step: 10,
      },
      min: 0,
    },
    {
      type: 'row',
      fields: [
        lexicalHTML('richText', {name: 'lexical_html'}),
        {
          type: 'richText',
          name: 'richText',
          editor: lexicalEditor({
            features: ({defaultFeatures}) => [
              ...defaultFeatures.filter((feature) => !['superscript', 'subscript', 'inlineCode', 'link'].includes(feature.key)),
              FixedToolbarFeature(),
              HTMLConverterFeature(),
            ]
          })
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'This is a test placeholder',
            // rtl: false,
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            placeholder: 'Email is unique !',
            width: '25%',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'test',
          label: 'Product Content',
          fields: [
            {
              name: 'number',
              type: 'number',
              admin: {
                placeholder: 'number !',
                step: 10,
              },
              min: 0,
            },
          ],
        },
        {
          name: 'Test 2',
          label: 'Product Media',
          fields: [
            {
              name: 'checkbox',
              type: 'checkbox',
              admin: {
                description: 'Select a checkbox option',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Bag',
          value: 'bag',
        },
        {
          label: 'Shoes',
          value: 'shoes',
        },
        {
          label: 'Hat',
          value: 'hat',
        },
      ],
      required: true,
      hasMany: true,
      admin: {
        placeholder: 'Select a category',
        isClearable: true,
        isSortable: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        placeholder: 'Enter a description',
      },
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'Select a date',
      },
      required: true,
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'media',
    },
    {
      type: 'relationship',
      name: 'authors',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        isSortable: true,
        allowCreate: true,
        allowEdit: true,
      },
      hasMany: true,
      filterOptions: ({data, siblingData, id, relationTo}) => {
        if (relationTo === 'users'){
          return {
            active: {
              equals: true
            }
          }
        }
        return {
          active: {
            equals: false
          }
        }
      }
    },
  ],
}
