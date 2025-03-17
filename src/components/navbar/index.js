import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../../store/productSlice";
import Button from "../Button";

const Navbar = () => {
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${Base_url}/category/getAll`)
      .then((res) => {
        console.log(res);

        setSubCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);


  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ProductdrawerOpen, setProductDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleDrawerProduct = () => {
    setProductDrawerOpen(!ProductdrawerOpen);
  };
  const productData = useSelector((state) => state?.next?.productData);
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      axios
        .get(`${Base_url}/products/search?title=${query}`)
        .then((res) => {
          console.log(res);

          setSearchResults(res.data.data || []);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    } else {
      setSearchResults([]);
    }
  };

  const productPrice = productData?.map((item) => item?.price * item?.quantity);
  console.log(productPrice);

  const totalPriceAfterDiscount = productPrice?.reduce((acc, price) => acc + price, 0);

  console.log("Total Price After Discount:", totalPriceAfterDiscount);

  return (
    <div className="py-3   px-4 flex justify-between items-center container mx-auto relative">
      {/* Menu Icon */}
      <div onClick={toggleDrawer} className="cursor-pointer">
        <FiMenu size={30} />
      </div>

      {/* Logo */}
      <div>
        <h1 className="font-extrabold text-[#1C1D41] sm:text-3xl text-2xl uppercase">Sobia Hamza</h1>
      </div>

      {/* Shopping Cart */}
      <div className=" flex items-center gap-3">
        <div className="relative ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}

            className="w-full p-2 border rounded"
            placeholder="Search products..."
          />
          <SearchResults results={searchResults} />
        </div>
        <Link onClick={toggleDrawerProduct} className="flex items-center relative">
          <TiShoppingCart size={30} />
          <p className="m-0 rounded-full absolute -top-1 -right-3 flex justify-center items-center text-white bg-red-500 w-6 h-6">
            {productData?.length}
          </p>
        </Link>
      </div>


      {/* Sliding Drawer (Left side) */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] text-black shadow-lg transition-transform transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ zIndex: 1000 }}
      >
        <div className=" w-64  h-full bg-white">
          <div>

          </div>
          <div className="flex  justify-between p-4">
            <Link to={'/'}> 
            <h1 className="font-extrabold text-[#1C1D41]  sm:text-2xl text-xl uppercase">Sobia Hamza</h1>
            </Link>
            
            <button onClick={toggleDrawer} className="text-black text-2xl">
              &times;
            </button>
          </div>
          <div className="p-4">
            <Link to={'/shop'}>
            <h2 className="text-xl font-semibold">Shop</h2>
            </Link>
            
            <ul className="mt-4 space-y-3">
              {subCategory?.map((item, index) => {
                return (
                  <>
                  <li>
                    <Link to={`/categories/${item._id}`}>
                    {item?.title}</Link>
                  </li>
                  
                  </>
                  
                )
              })}


            </ul>
          </div>
        </div>
      </div>



      {/* Sliding Drawer (Right side) */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-[rgba(0,0,0,0.5)] text-black shadow-lg transition-transform transform ${ProductdrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ zIndex: 1000 }}
      >
        <div className=" w-80 h-full ml-auto bg-white">
          {/* Header Section */}
          <div className="flex justify-between p-4">
            <h1 className="font-extrabold text-[#1C1D41] sm:text-2xl text-xl uppercase">
              your Cart
            </h1>
            <button onClick={toggleDrawerProduct} className="text-black text-2xl">
              &times;
            </button>
          </div>
          {/* Content Section */}
          <div className="p-4">

            
            {productData?.map((item, index) => {
              return (
                <div className=" flex border-b py-5 gap-4">
                  <div className=" w-20 h-20">
                    <img src={item?.image} className=" w-full h-full" alt="" />
                  </div>
                  <div className=" flex items-center justify-between">
                    <div>
                      <p className="">{item?.title}</p>
                      <span className=" font-semibold">${item?.price * item?.quantity}</span>


                      <div class="flex pt-3 items-center">
                        <button onClick={() => dispatch(decreaseQuantity({
                          _id: item._id,
                          quantity: 1
                        }))} type="button" id="decrement-button" data-input-counter-decrement="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                          <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                          </svg>
                        </button>
                        <input type="text" id="counter-input" data-input-counter class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={item?.quantity} required />
                        <button onClick={() => dispatch(increaseQuantity({
                          _id: item._id,
                          quantity: 1
                        }))} type="button" id="increment-button" data-input-counter-increment="counter-input" class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                          <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>

                    </div>

                    <div>
                      <IoIosCloseCircle onClick={() => dispatch(deleteProduct(item._id))} size={20} color="red" />
                    </div>

                  </div>
                </div>
              )
            })}



            
            <div className=" py-4">
              {productData?.length===0?(
                <>
                <div className="  text-center">
                <p className=" text-gray-700">Your cart is currently empty.</p> 
                <Link to={'/shop'}  >
                <Button
                  
                  label={"Continue Shopping"}
                  className={
                    " text-black font-semibold w-full hover:text-white py-1.5 mt-3 uppercase border border-black hover:bg-[black]"
                  }
                />
              </Link>
                </div>
               
                </>
              ):(

                <>
                 <div className=" flex justify-between items-center">
                <p className=" font-semibold">Total</p>
                <p className=" font-semibold">Rs.{totalPriceAfterDiscount}</p>
              </div>



              <Link to={'/cart'}  >
                <Button
                  onClick={() => setProductDrawerOpen(false)}
                  label={"View Cart"}
                  className={
                    " text-black font-semibold w-full hover:text-white py-1.5 mt-3 uppercase border border-black hover:bg-[black]"
                  }
                />
              </Link>

              <Link to={'/shop'}  >
                <Button
                  onClick={() => setProductDrawerOpen(false)}
                  label={"Continue Shopping"}
                  className={
                    " text-white bg-black font-semibold w-full hover:text-white py-1.5 mt-3 uppercase border border-black hover:bg-[black]"
                  }
                />
              </Link>
                </> 

              )}


            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
