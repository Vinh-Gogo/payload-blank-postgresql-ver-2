import { CollectionConfig } from "payload";

export const Product: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Product",
    plural: "Products",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Clothing", value: "clothing" },
        { label: "Accessories", value: "accessories" },
        { label: "Footwear", value: "footwear" },
      ],
      required: true,
    },
  ],
};
