import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Collections from "../../components/collections";
import Banner from "../../components/banner";
import CartProduct from "../../components/product/CartProduct";
import Navbar from "../../components/navbar";
import axios from "axios";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);

        setAllProduct(res.data, "all products");
      })
      .catch((error) => {});
  }, []);
  return (
    <div>
      <Navbar />
      <Banner />
      <Collections />
      <div className="mx-auto">
        <h1 className=" text-black font-bold py-4  px-4 text-2xl">Product</h1>
        <div className="  py-4  gap-4 grid px-4 sm:grid-cols-3 grid-cols-2">
          {allProduct?.map((item, index) => {
            return (
              <>
                <CartProduct productData={item} />
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
