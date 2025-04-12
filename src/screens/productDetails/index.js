import React, { useEffect, useState } from "react";
import { FaAngleRight, FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import Button from "../../components/Button";
import { MdClose } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal";
import axios from "axios";
import Tabs from "../../components/Tabs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Base_url } from "../../utils/Base_url";
import { addToCart } from "../../store/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const ProductDetails = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {

  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user_ID") || undefined;
  const [selectedSize, setSelectedSize] = useState(null);

  const [curr, setCurr] = useState(0);
  const prev = () =>
    setCurr((curr) => (curr === 0 ? allProduct?.images.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === allProduct?.images?.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  const goToSlide = (index) => {
    setCurr(index);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalSlider, setIsModalSlider] = useState(false);

  const openSlider = () => {
    setIsModalSlider(true);
  };

  const closeSlider = () => {
    setIsModalSlider(false);
  };

  const { id } = useParams();
  const [allProduct, setAllProduct] = useState({});
  const [singleStore, setSignleStore] = useState({});

 
  useEffect(() => {
    axios
      .get(`${Base_url}/products/get/${id}`)
      .then((res) => {
        console.log(res);

        setAllProduct(res.data.data, "all products");
      })
      .catch((error) => {});
  }, []);

  const [isLiked, setIsLiked] = useState(
    allProduct?.likes?.includes(storedUser)
  );
  const [likesCount, setLikesCount] = useState(allProduct?.likes?.length);
  console.log(isLiked);

  const handleLikeDislike = async () => {
    try {
      setIsLiked(!isLiked);

      const response = await axios.post(
        `/toggleLikeDislike/${allProduct._id}/${storedUser}`
      );

      if (response.data && response.data.likesCount !== undefined) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const images = [
    "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  ];



  const [quantity,setQuantity] = useState(1);
  const handleAddToCart = () => {
    // Check if product has sizes and if a size is selected
    if (allProduct?.size?.length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    dispatch(
      addToCart({
        _id: allProduct?._id,
        image: allProduct?.images[0],
        description: allProduct?.description,
        title: allProduct?.title,
        quantity:quantity,
        price: allProduct?.discountPrice,
        size: selectedSize 
      })
    );

    toast.success('Product added to cart successfully!');
  };


  const tabData = [
    { title: "Product Details", content:<>
    <p className="">Keep your closet on trend with the Allgood Relaxed 7/8 Cargo Pants. These trendy pants feature a neutral tan hue and a relaxed fit that offers a comfortable and easy-going wear. The 7/8 length and cargo pockets add a touch of utility to your look, making them a great choice for casual outings or weekend adventures, pairing well with your favourite tees or hoodies for a laid-back and effortless outfit.
    </p>
    <p className=" py-2 font-semibold">Model is wearing a Medium and is 186cm tall - with a 104cm chest and a 86cm waist.

</p>
<h6 className=" text-black font-semibold">Product Features:</h6>
<ul className=" flex flex-col gap-3">
  <li className=" pt-3">Cargo design </li>
  <li>Fixed waist</li>
  <li>Belt loops</li>
  <li>Zip fly & button</li>
  <li>Straight leg</li>
  <li>Multiple pockets</li>
  <li>Tan finish</li>
  <li>Main: Cotton (exclusive of trims)</li>
  <li>Lining: Polyester/Cotton</li>
  <li>Machine washable</li>
</ul>
    </>},
    { title: "Specification", content:""},
    { title: "Review", content:<>
     <p>Reviews</p>
     <p>Review this Product</p>
     <ul className=" py-3 flex gap-2 items-center">
      <li className=" w-14 h-14 flex justify-center items-center border  rounded-md">
      <FaRegStar size={20} />
      </li>
      <li className=" w-14 h-14 flex justify-center items-center border  rounded-md">
      <FaRegStar size={20} />
      </li>
      <li className=" w-14 h-14 flex justify-center items-center border  rounded-md">
      <FaRegStar size={20} />
      </li>
      <li className=" w-14 h-14 flex justify-center items-center border  rounded-md">
      <FaRegStar size={20} />
      </li>
      <li className=" w-14 h-14 flex justify-center items-center border  rounded-md">
      <FaRegStar size={20} />
      </li>
     </ul>
     <p>Be the first to review this product</p>

    </>},
    // { title: "Delivery & Returns", content: ""}
  ];
  const defaultTab = "Product Details";

  return (
    <div>
      <Navbar />
      <div className=" md:flex block container md:px-10 px-0 mx-auto py-4 justify-between">
        <div className="  sm:w-6/12  w-full">
          <div>
          <ul className="flex mb-4 gap-1 px-3 items-center overflow-x-auto whitespace-nowrap">
          <li>
                <Link
                  to={"/"}
                  className=" text-black font-medium  text-sm border-b  border-black"
                >
                  Home
                </Link>
              </li>

              <li className=" pt-1">
                <FaAngleRight  className=" text-gray-400" />
              </li>
              <li>
                <Link
                  to={`/categories/${allProduct?.categoryId?._id}`}
                  className=" text-black font-medium  text-sm border-b  border-black"
                >
                  {allProduct?.categoryId?.title}
                </Link>
              </li>
              <li className=" pt-1">
                <FaAngleRight  className=" text-gray-400" />
              </li>
              <li>
                <Link
                  to={""}
                  className=" text-black font-medium text-sm border-b  border-black"
                >
                 {allProduct?.subCategoryId?.title}
                </Link>
              </li>

              <li className=" pt-1">
                <FaAngleRight  className=" text-gray-400" />
              </li>

              <li>
                <a className=" text-gray-500  font-medium text-sm ">
                 {allProduct?.title}
                </a>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden relative  w-[100%]">
            <div
              className="flex  transition-transform ease-out duration-500 h-[75vh]"
              style={{ transform: `translateX(-${curr * 100}%)` }}
            >
              {allProduct?.images?.map((image, i) => {
                console.log(image, "slider image============>>>>>>>>>>>>>>");
                return (
                  <div key={i} className="flex-none w-full h-full">
                    <img
                    
                      src={image}
                      alt=""
                      className="w-full cursor-pointer h-full object-contain"
                    />
                  </div>
                );
              })}
            </div>
          
            {/* <button
              onClick={prev}
              className=" w-12 h-16 shadow  absolute left-12 top-56 flex  justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
            >
              <TfiAngleLeft size={20} className="" />
            </button>
            <button
              onClick={next}
              className=" w-12 h-16  absolute right-14 top-56 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <TfiAngleRight size={20} />
            </button>
           */}
          </div>
          <div className=" mt-5 md:block hidden">
            <div className="flex items-center justify-center gap-2">
              {allProduct?.images?.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`
              transition-all w-20 p-2 h-20 border overflow-hidden bg-white 
              ${curr === i ? " w-20 h-20  border-orange-400 " : "bg-opacity-50"}
            `}
                >
                  <img
                    src={_}
                    alt=""
                    className=" w-full h-full   object-center  "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" sm:w-6/12  w-full  mt-5 p-4">
        
         <div className=" border-b">
         <p className=" pb-2 font-semibold text-2xl">{`${allProduct?.title}`}</p>
         <div className=" pt-3">
         
         </div>
         </div>
         
         <h6 className="pb-2 pt-3">
            <span className=" text-[#E95144]  font-bold text-2xl">Rs.{allProduct?.discountPrice}</span>
            <span className=" text-[#969696]  line-through text-2xl  pl-3  font-semibold">
              Rs.{allProduct?.actualPrice}
            </span>
            
          </h6>

          <p>{allProduct?.description}</p>
          {allProduct?.size?.length > 0 ? (
  <p className=" pt-3 font-semibold text-lg">
   Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
</p>
          ):null}
        
  <ul className="flex gap-2 py-1.5 items-center">
    {allProduct?.size?.length > 0 ? (
      allProduct?.size?.map((item, index) => (
        <li 
          key={index} 
          className={`w-10 h-10 rounded-full border text-sm flex justify-center items-center cursor-pointer
            ${selectedSize === item ? 'bg-black text-white' : ''}`}
          onClick={() => setSelectedSize(item)}
        >
          <p>{item}</p>
        </li>
      ))
    ) : (
      <p className="text-gray-500"></p>
    )}
  </ul>
  {allProduct?.size?.length > 0 ? (
 <p className="  font-semibold text-lg">
 Size Guide:
</p>
  ):null}
 
         

          <div className=" flex gap-3  pt-4 items-center">

            <div  className=" w-40">
              <input type="number"   onChange={(e)=>e.target.value}  defaultValue={1}  className=" border py-3.5 text-lg px-3 w-full rounded-full"  />
            </div>
          <Button
    onClick={handleAddToCart} 
    label={"Add to cart"}
    className={"text-white rounded-full uppercase font-medium bg-[#232323] w-full py-3.5"}
  />


          </div>
          

       

        </div>
      </div>

      <div className=" container md:px-10 px-3 mx-auto py-10">

      {/* <Tabs tabs={tabData} defaultTab={defaultTab} /> */}
      
        {/* <ProductSlider */}

       {/* {data.map((item, index) => {
            return (
              <>
                <Product item={item.image} />
              </>
            );
          })} */}
        

        <Modal
          className={"sm:max-w-lg"}
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          {/* Modal Content */}
          <div className="">
            <div className=" p-3 flex justify-between items-center">
              <div></div>
              <h1 className="capitalize h4">Ask a question</h1>
              <MdClose onClick={() => setIsModalOpen(false)} size={25} />
            </div>
            <hr />

            <div className=" py-7  pb-10  max-w-sm  mx-auto">
              <div className="">
                <label className=" text-sm  font-medium">Send a message</label>
                <div>
                  <textarea
                    rows={6}
                    className="border bg-white w-full"
                  ></textarea>
                </div>
              </div>

              <div className=" text-center py-5">
                <p className=" text-xs">
                  We ensure that the items we review are authentic. All
                  purchases made on Grailed are eligible for protection
                </p>
                <span className=" text-black text-sm font-medium">
                  Learn more
                </span>
              </div>

              <Button
                label={"send message"}
                className={
                  " uppercase font-medium text-sm bg-black w-full py-3 text-white"
                }
              />
            </div>
          </div>

          {/* Close button */}
          {/* <div className="bg-gray-100 p-4">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close Modal
            </button>
          </div> */}
        </Modal>

        {/* slider modal */}

        <Modal
          className={"sm:max-w-7xl "}
          isOpen={isModalSlider}
          onClose={closeSlider}
        >
          {/* Modal Content */}
          <div className=" relative ">
            <div className=" flex justify-between items-center">
              <div></div>

              {/* <MdClose onClick={() => setIsModalSlider(false)} size={25} /> */}
            </div>
            <div className="flex flex-col  absolute z-50  top-0 items-center justify-center gap-2">
              {images?.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`
              transition-all w-20 h-20 p-2 overflow-hidden  bg-white 
              ${curr === i ? " w-14 h-14 border border-orange" : "bg-opacity-50"}
            `}
                >
                  <img
                    src={_}
                    alt=""
                    className=" w-full h-full   object-center  "
                  />
                </div>
              ))}
            </div>
            <div className="  mx-auto">
              <div className="overflow-hidden   w-96  relative">
                <div
                  className="flex  transition-transform ease-out duration-500"
                  style={{ transform: `translateX(-${curr * 100}%)` }}
                >
                  {images?.map((image, i) => {
                    console.log(
                      image,
                      "slider image============>>>>>>>>>>>>>>"
                    );
                    return (
                      <div key={i} className="flex-none w-full h-full">
                        <img
                          onClick={openSlider}
                          src={image}
                          alt=""
                          className="w-full cursor-pointer h-full object-contain"
                        />
                      </div>
                    );
                  })}
                </div>
                {/* <div className="absolute inset-0 flex items-center justify-between"> */}
                <button
                  onClick={prev}
                  className=" w-12 h-16 shadow  absolute left-0 top-56 flex  justify-center items-center bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleLeft size={20} className="" />
                </button>
                <button
                  onClick={next}
                  className=" w-12 h-16  absolute right-0 top-56 flex justify-center items-center shadow bg-white/80 text-gray-800 hover:bg-white"
                >
                  <TfiAngleRight size={20} />
                </button>
                {/* </div> */}
              </div>
            </div>
          </div>

          {/* Close button */}
          {/* <div className="bg-gray-100 p-4">
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close Modal
            </button>
          </div> */}
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
