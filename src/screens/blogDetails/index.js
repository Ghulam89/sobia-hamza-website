import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const BlogDetails = () => {
  return (
    <>
      <Navbar />
      <section>
        <h2 class="text-3xl font-bold text-center pb-3">Blogs</h2>
        <div className=" w-8/12 mx-auto  mt-3">
          <h1 className=" text-2xl text-black pb-2   font-semibold">
            Embracing Elegance with Amir Adnan’s Raat Rang Collection
          </h1>
          <img src={require("../../assets/images/blog1.webp")} alt="" />
          <div className="">
            <p className=" pt-2 font-semibold">
              Amir Adnan’s Raat Rang collection redefines men’s traditional wear
              by infusing it with luxurious touches that appeal to the modern
              man. This exquisite line features a variety of shalwar kameez,
              sherwanis, and waistcoats, each designed to stand out with rich,
              dark hues inspired by the allure of the night. The collection
              expertly marries traditional elegance with contemporary flair,
              showcasing intricate detailing and high-quality fabrics that
              ensure each piece is nothing short of spectacular.
            </p>

            <p className=" pt-2 font-semibold">
              Amir Adnan’s Raat Rang collection redefines men’s traditional wear
              by infusing it with luxurious touches that appeal to the modern
              man. This exquisite line features a variety of shalwar kameez,
              sherwanis, and waistcoats, each designed to stand out with rich,
              dark hues inspired by the allure of the night. The collection
              expertly marries traditional elegance with contemporary flair,
              showcasing intricate detailing and high-quality fabrics that
              ensure each piece is nothing short of spectacular.
            </p>
            <p className=" pt-2 font-semibold">
              Amir Adnan’s Raat Rang collection redefines men’s traditional wear
              by infusing it with luxurious touches that appeal to the modern
              man. This exquisite line features a variety of shalwar kameez,
              sherwanis, and waistcoats, each designed to stand out with rich,
              dark hues inspired by the allure of the night. The collection
              expertly marries traditional elegance with contemporary flair,
              showcasing intricate detailing and high-quality fabrics that
              ensure each piece is nothing short of spectacular.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogDetails;
