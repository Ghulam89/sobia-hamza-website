import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialYoutubeCircular } from "react-icons/ti";

const Footer = () => {
  return (
    <div className=" bg-white py-10  px-4 container mx-auto">
        <div className=" grid  md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {/* first cols */}
      <div className=" pt-4">
      <div>
        <h1 className="font-extrabold text-[#1C1D41] sm:text-3xl text-2xl uppercase">Sobia Hamza</h1>
      </div>
        <p className="  text-sm text-black pt-4">
          Plot no 31-C,Al Murtaza Commercial Lane-2,Phase
          8,DHA,Karachi,Pakistan. Email: helpdesk@amiradnan.com
        </p>
        <p className=" text-sm text-black pt-3">
          Call us: 03353039489 - 03353039451
        </p>
      </div>
      {/* second cols */}

      <div>
        <h5 className=" text-[#232323] font-bold">Help & Information</h5>
        <ul className=" p-0 leading-7">
          <li>
            <Link to={"/blog"} className=" text-black text-sm">
              Blogs
            </Link>
          </li>
          {/* <li>
            <Link to={"#"} className=" text-black text-sm">
              Store Locator
            </Link>
          </li> */}
          
          <li>
            <Link to={"/contact-us"} className=" text-black text-sm">
              Contact us
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
              Refund policy
            </Link>
          </li>
        </ul>
      </div>

       {/* third cols */}

       <div>
        <h5 className=" text-[#232323] font-bold">Customer Information</h5>
        <ul className=" p-0 leading-7">
          <li>
            <Link to={"#"} className=" text-black text-sm">
              Size Guide
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
              Ordering & Payment
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
              Shipping Info
            </Link>
          </li>
          
         
          <li>
            <Link to={"#"} className=" text-black text-sm">
               Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={"/faqs"} className=" text-black text-sm">
               FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* four cols */}

      <div>
       
        <ul className=" p-0 flex gap-3 items-center pb-6">
          <li>
            <Link to={"#"} className=" text-black text-sm">
              <FaFacebookF color="#000" size={25} alt="" />
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
            <IoLogoInstagram size={30} color="#000" />
            </Link>
          </li>
          <li>
            <Link to={"#"} className=" text-black text-sm">
            <TiSocialYoutubeCircular size={30} color="#000" />
            </Link>
          </li>
         
        </ul>
        <h5 className=" text-[#232323] font-bold">Newsletter Sign Up</h5>

        <p className=" text-sm text-black pb-3 pt-2">
        Receive our latest updates about our products and promotions.
        </p>
        <Input   className={' border  w-full text-sm placeholder:text-gray-400  font-normal '} placeholder={'Your Email Address'} />
        <Button  label={'SUBMIT'} className={' text-white w-full mt-3 bg-[#232323] py-2'} />
      </div>
    </div>

    <div className="  pt-12 flex justify-between items-center flex-wrap ">
        <div>
            <p className=" m-0 text-sm text-[#232323]">© 2024 Sobia Hamza. All Rights Reserved</p>
        </div>
        <ul className=" flex  gap-3 items-center p-0">
            <li>
                <img src={require('../../assets/images/Visa-Logo.png')} className=" w-12" alt="" />
            </li>
            <li>
                <img src={require('../../assets/images/Visa-Logo2.png')} alt="" />
            </li>
            <li>
                <img src={require('../../assets/images/Mastercard-Logo.png')} alt="" />
            </li>
            <li>
                <img src={require('../../assets/images/Discover_logo.png')} alt="" />
            </li>
            <li>
                <img src={require('../../assets/images/PayPal-Logo.png')} alt="" />
            </li>
        </ul>
    </div>
    </div>
  );
};

export default Footer;
