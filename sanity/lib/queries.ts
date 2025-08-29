import { groq } from "next-sanity";

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  slug,
  price,
  details,
  "image": image[].asset->url
}`;

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  price,
  details,
  "image": image[].asset->url
}`;

export const bannerQuery = groq`*[_type == "banner"][0] {
  smallText,
  midText,
  largeText1,
  largeText2,
  desc,
  buttonText,
  product,
  "image": image.asset->url
}`;

export const footerBannerQuery = groq`*[_type == "footerBanner"][0] {
  discount,
  largeText1,
  largeText2,
  saleTime,
  midText,
  product,
  buttonText,
  "image": image.asset->url,
  smallText,
  desc
}`;
