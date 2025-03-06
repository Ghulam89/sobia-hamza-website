import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import parse from 'html-react-parser';
const BlogDetails = () => {
  const { id } = useParams();

  const [blogs, setBlogs] = useState([]);




  useEffect(() => {
    axios
      .get(`${Base_url}/blog/get/${id}`)
      .then((res) => {
        console.log(res);

        setBlogs(res.data.data, "all products");
      })
      .catch((error) => { });
  }, []);

  return (
    <>
      <Navbar />
      <section>
        <h2 class="text-3xl font-bold text-center pb-3">Blogs</h2>
        <div className=" w-8/12 mx-auto  text-center mt-3">
          <h1 className=" text-2xl text-black pb-2   font-semibold">
            {blogs?.title}
          </h1>
          <img src={blogs?.image} className=" mx-auto" alt="" />
          <div className=" mt-12">
            {parse(blogs?.content || '')}

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetails;
