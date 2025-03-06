import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const Blog = ({ blogData }) => {
  return (
    <>
      <article className="flex flex-col z-30 p-4 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105 dark:bg-gray-50 hover:shadow-2xl">
        <Link
          rel="noopener noreferrer"
          className="overflow-hidden"
          to={`/blog_details/${blogData?._id}`}
          aria-label="Te nulla oportere reprimique over his dolorum"
        >
          <img
            alt=""
            className="object-cover rounded-xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-52 dark:bg-gray-500"
            src={blogData?.image}
          />
        </Link>
        <div className="flex flex-col flex-1 bg-white dark:bg-gray-50 p-4 rounded-b-xl">
          <h3 className="text-lg font-semibold leading-snug text-gray-800 dark:text-gray-900 py-2">
            {blogData?.title || "Blog Title"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-500">{blogData?.shortDescription}</p>
          <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-500 dark:text-gray-600">
            <span>{blogData?.date || "June 1, 2020"}</span>
          </div>

          <div className=" flex justify-start items-center">
          <Button label={'Read More'} className={' border rounded-sm  px-3 py-1 hover:text-white  hover:bg-black border-black  mt-3'} />
          </div>
        </div>
      </article>
    </>
  );
};

export default Blog;
