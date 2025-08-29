import { client } from "../../../sanity/lib/client";
import { productQuery, productsQuery } from "../../../sanity/lib/queries";
import ProductDetailsClient from "./ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await client.fetch(productQuery, { slug });
  const products = await client.fetch(productsQuery);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductDetailsClient product={product} products={products} />;
}
