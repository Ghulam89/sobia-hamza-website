import React from "react";
import { Link } from "react-router-dom";

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute bg-white right-0 shadow-lg rounded-lg w-96 mt-2 z-50">
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4">Product Results</h3>
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {results.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 border rounded-lg overflow-hidden shadow-sm"
            >
              <Link to={`/product_details/${product._id}`} className="block">
                <img
                  src={product?.images?.[0]}
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
              </Link>
              <div className="p-2 text-center">
                <p className="text-sm font-semibold truncate">{product.title}</p>
                {product.discountPrice ? (
                  <div>
                    <p className="text-red-500 font-bold text-sm">
                      Rs.{product.discountPrice}
                    </p>
                    <p className="text-gray-500 line-through text-xs">
                      Rs.{product.actualPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-800 font-bold text-sm">
                    Rs.{product.actualPrice}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/shop"
          className="block text-center text-blue-600 font-semibold mt-4 hover:underline"
        >
          See All Results ({results.length})
        </Link>
      </div>
    </div>
  );
};

export default SearchResults;