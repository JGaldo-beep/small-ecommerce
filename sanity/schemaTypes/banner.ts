export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'smallText',
      title: 'Small Text',
      type: 'string',
    },
    {
      name: 'midText',
      title: 'Mid Text',
      type: 'string',
    },
    {
      name: 'largeText1',
      title: 'Large Text 1',
      type: 'string',
    },
    {
      name: 'largeText2',
      title: 'Large Text 2',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    },
    {
      name: 'product',
      title: 'Product',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
