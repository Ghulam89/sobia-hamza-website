import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Blog from "../../components/product/Blog";

const Blogs = () => {


     const blogs  = [
        {
            id:1,
            title:'Embracing Elegance with Amir Adnan’s Raat Rang Collection',
            para:"Embracing Elegance with Amir Adnan’s Raat Rang Collection   Amir Adnan’s Raat Rang collection redefines men’s traditional wear by infusing it with luxurious touches that appeal to the modern man. This exquisite line features a variety of shalwar kameez, sherwanis, and waistcoats, each designed to stand out with rich, dark hues inspired by the allure of the night. The collection expertly marries traditional elegance...",
            image:'https://amiradnan.com/cdn/shop/articles/957X367_1024x1024.jpg?v=1731412368',
        },
        {
            id:2,
            title:'Embracing Elegance with Amir Adnan’s Raat Rang Collection',
            para:"Embracing Elegance with Amir Adnan’s Raat Rang Collection   Amir Adnan’s Raat Rang collection redefines men’s traditional wear by infusing it with luxurious touches that appeal to the modern man. This exquisite line features a variety of shalwar kameez, sherwanis, and waistcoats, each designed to stand out with rich, dark hues inspired by the allure of the night. The collection expertly marries traditional elegance...",
            image:'https://amiradnan.com/cdn/shop/articles/957X367_1024x1024.jpg?v=1731412368',
        },
        {
            id:3,
            title:'Embracing Elegance with Amir Adnan’s Raat Rang Collection',
            para:"Embracing Elegance with Amir Adnan’s Raat Rang Collection   Amir Adnan’s Raat Rang collection redefines men’s traditional wear by infusing it with luxurious touches that appeal to the modern man. This exquisite line features a variety of shalwar kameez, sherwanis, and waistcoats, each designed to stand out with rich, dark hues inspired by the allure of the night. The collection expertly marries traditional elegance...",
            image:'https://amiradnan.com/cdn/shop/articles/957X367_1024x1024.jpg?v=1731412368',
        },
        {
            id:4,
            title:'Embracing Elegance with Amir Adnan’s Raat Rang Collection',
            para:"Embracing Elegance with Amir Adnan’s Raat Rang Collection   Amir Adnan’s Raat Rang collection redefines men’s traditional wear by infusing it with luxurious touches that appeal to the modern man. This exquisite line features a variety of shalwar kameez, sherwanis, and waistcoats, each designed to stand out with rich, dark hues inspired by the allure of the night. The collection expertly marries traditional elegance...",
            image:'https://amiradnan.com/cdn/shop/articles/957X367_1024x1024.jpg?v=1731412368',
        },
     ]
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
