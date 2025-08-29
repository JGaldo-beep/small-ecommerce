import { client } from "../sanity/lib/client";
import {
  productsQuery,
  bannerQuery,
  footerBannerQuery,
} from "../sanity/lib/queries";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";
import FooterBanner from "../components/FooterBanner";
import Footer from "../components/Footer";

interface ProductType {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  details: string;
  image: string[];
}

interface BannerType {
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  desc: string;
  buttonText: string;
  product: string;
  image: string;
}

interface FooterBannerType {
  discount: string;
  largeText1: string;
  largeText2: string;
  saleTime: string;
  midText: string;
  product: string;
  buttonText: string;
  image: string;
  smallText: string;
  desc: string;
}

async function getData() {
  try {
    console.log("Fetching data from Sanity...");

    const [productsData, bannerData, footerBannerData] = await Promise.all([
      client.fetch(productsQuery),
      client.fetch(bannerQuery),
      client.fetch(footerBannerQuery),
    ]);

    return {
      products: productsData || [],
      banner: bannerData,
      footerBanner: footerBannerData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      products: [],
      banner: null,
      footerBanner: null,
    };
  }
}

export default async function Home() {
  const { products, banner, footerBanner } = await getData();

  return (
    <div>
      {banner ? (
        <HeroBanner heroBanner={banner} />
      ) : (
        <div
          className="hero-placeholder"
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#f0f0f0",
            margin: "1rem 0",
          }}
        >
          <h1>Welcome to HeadPhones Studio</h1>
          <p>Best headphones in the market</p>
        </div>
      )}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.length > 0 ? (
          products.map((product: any) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <p>No products found. Please check your Sanity configuration.</p>
          </div>
        )}
      </div>

      {footerBanner ? (
        <FooterBanner footerBanner={footerBanner} />
      ) : (
        <div
          className="footer-placeholder"
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#f0f0f0",
            margin: "1rem 0",
          }}
        >
          <h3>Special Offers Coming Soon</h3>
        </div>
      )}

      <Footer />
    </div>
  );
}
