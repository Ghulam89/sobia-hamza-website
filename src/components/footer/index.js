import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import Input from "../Input";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import { toast } from "react-toastify";

const Footer = () => {
  // Formik setup for newsletter subscription
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting, setStatus }) => {
      try {
        const response = await axios.post(
          `${Base_url}/subscribe/create`,
          {
            email: values.email,
          }
        );

        if (response.data.status ==="success") {
          setStatus({ success: true, message: "Subscription successful!" });
          toast.success(response?.data?.message);
          resetForm();
        } else {
          setStatus({
            success: false,
            message: "Subscription failed. Please try again.",
          });
        }
      } catch (error) {
        setStatus({
          success: false,
          message: error.response?.data?.message || "An error occurred",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white py-10 px-4 container mx-auto">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {/* first cols */}
        <div className="pt-4">
          <div>
            <h1 className="font-extrabold text-[#1C1D41] sm:text-3xl text-2xl uppercase">
              Sobia Hamza
            </h1>
          </div>
          <p className="text-sm text-black pt-4">
            Plot no 31-C,Al Murtaza Commercial Lane-2,Phase
            8,DHA,Karachi,Pakistan. Email: helpdesk@amiradnan.com
          </p>
          <p className="text-sm text-black pt-3">
            Call us: 03353039489 - 03353039451
          </p>
        </div>

        {/* second cols */}
        <div>
          <h5 className="text-[#232323] font-bold">Help & Information</h5>
          <ul className="p-0 leading-7">
            <li>
              <Link to={"/blog"} className="text-black text-sm">
                Blogs
              </Link>
            </li>
            <li>
              <Link to={"/contact-us"} className="text-black text-sm">
                Contact us
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-black text-sm">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-black text-sm">
                Refund policy
              </Link>
            </li>
          </ul>
        </div>

        {/* third cols */}
        <div>
          <h5 className="text-[#232323] font-bold">Customer Information</h5>
          <ul className="p-0 leading-7">
            <li>
              <Link to={"#"} className="text-black text-sm">
                Size Guide
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-black text-sm">
                Ordering & Payment
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-black text-sm">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to={"#"} className="text-black text-sm">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"/faqs"} className="text-black text-sm">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* four cols */}
        <div>
          <ul className="p-0 flex gap-3 items-center pb-6">
            <li>
              <Link to={"https://www.facebook.com/Sobiahamza143"} className="text-black text-sm">
                <FaFacebookF color="#000" size={25} alt="" />
              </Link>
            </li>
            <li>
              <Link to={"https://www.instagram.com/sobiahamza7?igsh=MWExeTBjd2FnOGV2Ng=="} className="text-black text-sm">
                <IoLogoInstagram size={30} color="#000" />
              </Link>
            </li>
            {/* <li>
              <Link to={"#"} className="text-black text-sm">
                <TiSocialYoutubeCircular size={30} color="#000" />
              </Link>
            </li> */}
          </ul>
          <h5 className="text-[#232323] font-bold">Newsletter Sign Up</h5>

          <p className="text-sm text-black pb-3 pt-2">
            Receive our latest updates about our products and promotions.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`border w-full text-sm placeholder:text-gray-400 font-normal ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Your Email Address"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}

            {formik.status && (
              <div
                className={`text-xs mt-1 ${
                  formik.status.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {formik.status.message}
              </div>
            )}

            <Button
              type="submit"
              label={
                formik.isSubmitting ? "PROCESSING..." : "SUBMIT"
              }
              className="text-white w-full mt-3 bg-[#232323] py-2 disabled:opacity-50"
           
            />
          </form>
        </div>
      </div>

      <div className="pt-12 flex justify-between items-center flex-wrap">
        <div>
          <p className="m-0 text-sm text-[#232323]">
            © 2024 Sobia Hamza. All Rights Reserved
          </p>
        </div>
        <ul className="flex gap-3 items-center p-0">
          <li>
            <img
              src={require("../../assets/images/Visa-Logo.png")}
              className="w-12"
              alt=""
            />
          </li>
          <li>
            <img
              src={require("../../assets/images/Visa-Logo2.png")}
              alt=""
            />
          </li>
          <li>
            <img
              src={require("../../assets/images/Mastercard-Logo.png")}
              alt=""
            />
          </li>
          <li>
            <img
              src={require("../../assets/images/Discover_logo.png")}
              alt=""
            />
          </li>
          <li>
            <img
              src={require("../../assets/images/PayPal-Logo.png")}
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;