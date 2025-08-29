// collections/Users.ts

import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Bật tính năng xác thực của Payload
  admin: {
    useAsTitle: 'email',
    group: 'Users',
  },
  access: {
    // Chỉ admin mới có thể tạo người dùng mới
    create: ({ req }) => authenticated({ req, roles: ['admin'] }),
    // Cho phép người dùng đọc hồ sơ của chính họ và admin đọc tất cả hồ sơ
    read: ({ req, id }) => {
      // Nếu có người dùng, kiểm tra xem họ có phải admin không
      if (req.user?.roles?.includes('admin')) {
        return true;
      }
      // Hoặc cho phép người dùng đọc hồ sơ của chính họ
      return req.user?.id === id;
    },
    // Cho phép người dùng cập nhật hồ sơ của chính họ và admin cập nhật tất cả hồ sơ
    update: ({ req, id }) => {
      if (req.user?.roles?.includes('admin')) {
        return true;
      }
      // Hoặc cho phép người dùng cập nhật hồ sơ của chính họ
      return req.user?.id === id;
    },
    // Chỉ admin mới có thể xóa người dùng
    delete: ({ req }) => authenticated({ req, roles: ['admin'] }),
  },
  defaultPopulate: {
    slug: true,
    name: true
  },
  fields: [
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      // Sử dụng type: 'relationship' để liên kết
      name: 'authoredProducts', 
      type: 'relationship', 
      relationTo: 'products', // Tên collection cần liên kết đến
      hasMany: true, // Cho phép liên kết nhiều sản phẩm
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      hasMany: true,
    },
  ],
}