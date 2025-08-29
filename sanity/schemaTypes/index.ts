import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import banner from './banner'
import footerBanner from './footerBanner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner, footerBanner],
}
