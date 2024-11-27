import React from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  return (
    <div className=" mt-2">
      <Link to={'/categories'}>
      <img
        src={require("../../assets/images/collection1.webp")}
        className=" w-full"
        alt=""
      />
      </Link>
      

      <div className=" grid grid-cols-3 gap-4  px-4 mt-2">
        <div className="  flex flex-col justify-between  gap-8">
          <Link to={'/categories'}>
            <img
              src={require("../../assets/images/collection2.webp")}
              className="w-full"
              alt=""
            />
          </Link>
          <Link to={'/categories'}>
            <img
              src={require("../../assets/images/collection5.webp")}
              className="w-full"
              alt=""
            />
          </Link>
        </div>
        <Link to={'/categories'}>
          <img
            src={require("../../assets/images/collection3.webp")}
            className=" h-full w-full"
            alt=""
          />
         </Link >
        <div className="  justify-between flex flex-col  gap-8">
          <Link to={'/categories'}>
            <img
              src={require("../../assets/images/collection4.webp")}
              className="w-full"
              alt=""
            />
          </Link>
          <div>
            <img
              src={require("../../assets/images/collection6.webp")}
              className="w-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
