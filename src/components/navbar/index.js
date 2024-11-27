import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="py-2   px-4 flex justify-between items-center container mx-auto relative">
      {/* Menu Icon */}
      <div onClick={toggleDrawer} className="cursor-pointer">
        <FiMenu size={30} />
      </div>

      {/* Logo */}
      <div>
        <h1 className="font-extrabold text-[#1C1D41] sm:text-3xl text-2xl uppercase">Sobia Hamza</h1>
      </div>

      {/* Shopping Cart */}
      <Link to={'/cart'} className="flex items-center relative">
        <TiShoppingCart size={30} />
        <p className="m-0 rounded-full absolute -top-1 -right-3 flex justify-center items-center text-white bg-red-500 w-6 h-6">
          0
        </p>
      </Link>

      {/* Sliding Drawer (Left side) */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] text-black shadow-lg transition-transform transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className=" w-64 bg-white">
        <div>
       
      </div>
        <div className="flex  justify-between p-4">
        <h1 className="font-extrabold text-[#1C1D41]  sm:text-2xl text-xl uppercase">Sobia Hamza</h1>
          <button onClick={toggleDrawer} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Shop</h2>
          <ul className="mt-4 space-y-3">
            <li>Blessed Friday</li>
            <li>Winter Shawls</li>
            <li>Blessed Gifts</li>
            <li>Western</li>
            <li>Super Sale</li>
            <li>Kameez Shalwar</li>
            <li>Waistcoat</li>
            <li>Sherwani</li>
            <li>Footwear</li>
            <li>Personal Care</li>
            <li>Oral Care</li>
            <li>Fragrances</li>
            <li>Weddings</li>
            <li>Couture</li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
