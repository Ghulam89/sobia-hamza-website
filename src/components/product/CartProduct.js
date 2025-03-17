import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const Products = ({ productData }) => {
  return (
    <Link to={`/product_details/${productData?._id}`} className="w-full bg-white text-black group overflow-hidden">
      <div className="w-full relative h-80">
        <img
          className="h-full w-full object-cover object-center"
          src={productData?.images?.[0]}
          alt={productData?.title}
        />
        <div>
          <p className="m-0 bg-red-400 text-white absolute top-0 px-2 py-0.5">{productData?.gst}%</p>
        </div>
      </div>

      <hr />

      <div className="py-3 flex flex-col gap-1">
        <p className="text-gray-500 tracking-wide font-bold">
          {productData?.title?.slice(0, 45)}
        </p>

        <p className="flex items-center gap-2">
          <span className="line-through text-gray-400">Rs.{productData?.actualPrice}</span>
          <span className="text-red-600 font-semibold">Rs.{productData?.discountPrice}</span>
        </p>

        <Button
          label={"Add To Cart"}
          className={
            "text-black font-semibold hover:text-white py-1.5 mt-3 uppercase border border-black hover:bg-[black]"
          }
        />
      </div>
    </Link>
  );
};

export default Products;