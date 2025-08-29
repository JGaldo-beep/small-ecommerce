"use client";

import { useState } from "react";
import { urlFor } from "../../../lib/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../../components/Product";
import { useStateContext } from "../../../context/StateContext";
import { Toaster } from "react-hot-toast";

interface ProductType {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  details: string;
  image: string[];
}

interface ProductDetailsProps {
  product: ProductType;
  products: ProductType[];
}

export default function ProductDetailsClient({
  product,
  products,
}: ProductDetailsProps) {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <Toaster />
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={image && image[index] ? urlFor(image[index]).url() : ""}
              className="product-detail-image"
              alt={name}
            />
          </div>

          {/* image  */}
          <div className="small-images-container">
            {image?.map((item: string, i: number) => (
              <img
                key={i}
                src={urlFor(item).url()}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={`${name} - Image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">{price} USD</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Also like */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
