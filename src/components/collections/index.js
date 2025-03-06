import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Base_url } from "../../utils/Base_url";

const Collections = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/category/getAll`)
      .then((res) => {
        console.log(res);
        setCategories(res.data.data); // Assuming `res.data.data` is an array of category objects
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div
            key={category._id || index}
            className=" w-full h-96 gap-4"
          >
            <Link to={`/categories/${category._id || category._id}`}>
              <img
                src={category.image}
                className="w-full h-full object-center "
                alt={category.name || "Category"}
              />
            </Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
