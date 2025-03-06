import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Blog from "../../components/product/Blog";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";

const Blogs = () => {


  const [blogs,setBlogs] = useState([]);      
     useEffect(() => {
      axios
        .get(`${Base_url}/blog/getAll?page=1`)
        .then((res) => {
          console.log(res);
  
          setBlogs(res?.data?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <>
      <Navbar />
      <section class="py-6 sm:py-12 dark:bg-gray-100 dark:text-gray-800">
        <div class="container p-6 mx-auto space-y-8">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-bold">Blogs</h2>
            <p class="font-serif text-sm dark:text-gray-600">
              {" "}
              Stay updated with the latest e-commerce trends, tips, and
              strategies to boost your online business. From marketing hacks to
              product recommendations, our blog is your go-to resource for all
              things e-commerce.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs?.map((item,index)=>{
                return (
                    <>
                    <Blog blogData={item} />
                    </>
                )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
