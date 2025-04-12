import React, { useEffect, useRef, useState } from "react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ProductdrawerOpen, setProductDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.next?.productData);
  
  // Fetch categories
  useEffect(() => {
    axios.get(`${Base_url}/category/getAll`)
      .then((res) => {
        setSubCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDrawerProduct = () => {
    setProductDrawerOpen(!ProductdrawerOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      axios.get(`${Base_url}/products/search?title=${query}`)
        .then((res) => {
          setSearchResults(res.data.data || []);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    } else {
      setSearchResults([]);
    }
  };

  const totalPriceAfterDiscount = productData?.reduce(
    (acc, item) => acc + (item?.price * item?.quantity),
    0
  );

  return (
    <>
      <div className="py-3 px-4 flex justify-between items-center container mx-auto relative">
        {/* Menu Icon */}
        <div onClick={toggleDrawer} className="cursor-pointer">
          <FiMenu size={30} />
        </div>

        {/* Logo */}
        <Link to="/">
          <h1 className="font-extrabold text-[#1C1D41] sm:text-3xl text-2xl uppercase">Sobia Hamza</h1>
        </Link>

        {/* Shopping Cart */}
        <div className="flex items-center gap-3">
          <div className="relative">
          <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full p-2 border rounded"
              placeholder="Search products..."
            />
            <SearchResults results={searchResults} />
          </div>
          <div onClick={toggleDrawerProduct} className="flex items-center relative cursor-pointer">
            <TiShoppingCart size={30} />
            <p className="m-0 rounded-full absolute -top-1 -right-3 flex justify-center items-center text-white bg-red-500 w-6 h-6">
              {productData?.length || 0}
            </p>
          </div>
        </div>

        {/* Left Sidebar Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] text-black shadow-lg transition-transform transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ zIndex: 1000 }}
          onClick={toggleDrawer} // Close when clicking on overlay
        >
          <div 
            className="w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
          >
            <div className="flex justify-between p-4">
              <Link to="/" onClick={toggleDrawer}>
                <h1 className="font-extrabold text-[#1C1D41] sm:text-2xl text-xl uppercase">Sobia Hamza</h1>
              </Link>
              <button onClick={toggleDrawer} className="text-black text-2xl">
                &times;
              </button>
            </div>
            
            <div className="p-4">
              <Link to="/shop" className="block mb-4" onClick={toggleDrawer}>
                <h2 className="text-xl font-semibold hover:text-gray-600">Shop</h2>
              </Link>
              
              <ul className="space-y-2">
                {subCategory?.map((item) => (
                  <li key={item._id} className="hover:bg-gray-100 rounded">
                    <Link
                      to={`/categories/${item._id}`}
                      className="block w-full p-2"
                      onClick={toggleDrawer}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Cart Drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-[rgba(0,0,0,0.5)] text-black shadow-lg transition-transform transform ${
            ProductdrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ zIndex: 1000 }}
          onClick={toggleDrawerProduct}
        >
          <div 
            className="w-80 relative h-full ml-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between p-4">
              <h1 className="font-extrabold text-[#1C1D41] sm:text-2xl text-xl uppercase">
                Your Cart
              </h1>
              <button onClick={toggleDrawerProduct} className="text-black text-2xl">
                &times;
              </button>
            </div>
            
            <div className="p-4 h-[calc(100%-180px)] overflow-y-auto">
              {productData?.length > 0 ? (
                productData.map((item) => (
                  <div key={item._id} className="flex border-b py-5 gap-4">
                    <div className="w-20 h-20">
                      <img src={item?.image} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item?.title}</p>
                        <span className="font-semibold">${(item?.price * item?.quantity).toFixed(2)}</span>
                        
                        <div className="flex pt-3 items-center">
                          <button 
                            onClick={() => dispatch(decreaseQuantity({
                              _id: item._id,
                              quantity: 1
                            }))} 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input 
                            type="text" 
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none" 
                            value={item?.quantity} 
                            readOnly 
                          />
                          <button 
                            onClick={() => dispatch(increaseQuantity({
                              _id: item._id,
                              quantity: 1
                            }))} 
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                          >
                            <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="cursor-pointer">
                        <IoIosCloseCircle 
                          onClick={() => dispatch(deleteProduct(item._id))} 
                          size={20} 
                          color="red" 
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-700">Your cart is currently empty.</p> 
                </div>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
              {productData?.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">${totalPriceAfterDiscount?.toFixed(2)}</p>
                  </div>
                  
                  <Link to="/cart" onClick={toggleDrawerProduct}>
                    <Button
                      label="View Cart"
                      className="text-black font-semibold w-full hover:text-white py-1.5 uppercase border border-black hover:bg-black"
                    />
                  </Link>
                </>
              )}
              
              <Link to="/shop" onClick={toggleDrawerProduct}>
                <Button
                  label={productData?.length > 0 ? "Continue Shopping" : "Start Shopping"}
                  className={`mt-3 w-full py-1.5 uppercase ${
                    productData?.length > 0 
                      ? "text-white bg-black font-semibold hover:bg-gray-800 border border-black"
                      : "text-black font-semibold hover:text-white border border-black hover:bg-black"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;