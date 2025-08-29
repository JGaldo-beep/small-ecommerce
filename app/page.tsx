"use client";

import { useEffect, useState } from "react";
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
import LLMTestButton from "../components/LLMTestButton";

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

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [banner, setBanner] = useState<BannerType | null>(null);
  const [footerBanner, setFooterBanner] = useState<FooterBannerType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔍 Fetching data from Sanity...");

        const [productsData, bannerData, footerBannerData] = await Promise.all([
          client.fetch(productsQuery),
          client.fetch(bannerQuery),
          client.fetch(footerBannerQuery),
        ]);

        console.log("📦 Products data:", productsData);
        console.log("🎯 Banner data:", bannerData);
        console.log("🦶 Footer banner data:", footerBannerData);

        setProducts(productsData || []);
        setBanner(bannerData);
        setFooterBanner(footerBannerData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>🔄 Loading...</h2>
        <p>Fetching data from Sanity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h2>❌ Error Loading Data</h2>
        <p>{error}</p>
        <p>Please check your Sanity configuration and environment variables.</p>
      </div>
    );
  }

  return (
    <div>
      {banner ? (
        <HeroBanner heroBanner={banner} />
      ) : (
        <div
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

      {products && products.length > 0 ? (
        <>
          <div className="products-heading">
            <h2>Best Selling Products</h2>
            <p>Speakers of many variations</p>
          </div>

          <div className="products-container">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>No products found. Please check your Sanity configuration.</p>
        </div>
      )}

      {/* LLM Test Button - Temporary for debugging */}
      <LLMTestButton />

      {footerBanner ? (
        <FooterBanner footerBanner={footerBanner} />
      ) : (
        <div
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
