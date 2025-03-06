import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Collections from "../../components/collections";
import Banner from "../../components/banner";
import CartProduct from "../../components/product/CartProduct";
import Navbar from "../../components/navbar";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios
    .get(`${Base_url}/products/getAll?page=1`)
    .then((res) => {
      console.log(res);

      setAllProduct(res?.data?.data?.data);
    })
    .catch((error) => {
      console.log(error);
    });
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
