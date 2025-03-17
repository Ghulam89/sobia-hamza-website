import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${Base_url}/category/getAll`)
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
     {categories.length > 0 && (
        <Link to={`/categories/${categories[0]._id}`}>
          <img
            src={categories[0].image}
            className="w-full h-full mt-2 object-center"
            alt={categories[0].name || "Category"}
          />
        </Link>
      )}

      <div className="mt-4 px-4">
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories?.slice(1)?.map((category) => (
          <div key={category._id} className="w-full h-96 gap-4">
            <Link to={`/categories/${category._id}`}>
              <img
                src={category.image}
                className="w-full h-full object-center"
                alt={category.name || "Category"}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  
  );
};

export default Collections;