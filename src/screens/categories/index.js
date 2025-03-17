import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Accordion from "../../components/Accordion/Accordion";
import { MdClose } from "react-icons/md";
import Input from "../../components/Input";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Footer from "../../components/footer";
import CartProduct from "../../components/product/CartProduct";
import Navbar from "../../components/navbar";
import { Base_url } from "../../utils/Base_url";
import { useParams } from "react-router-dom";
const Categories = () => {
  const [allProduct, setAllProduct] = useState([]);
  const { id } = useParams();
  const [filter, setFilter] = useState(" ");

  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${Base_url}/Products/category/${id}`)
      .then((res) => {
        console.log(res);

        setAllProduct(res?.data, "all products");
      })
      .catch((error) => { });

    axios
      .post("http://34.84.41.203:4142/api/getAllDepartments")
      .then((res) => {
        console.log(res);

        setAllCategory(res.data);
      })
      .catch((error) => { });
  }, []);

  const [designer, setDesigner] = useState([]);

  useEffect(() => {
    axios
      .post(`/getAllBrands`)
      .then((res) => {
        setDesigner(res.data.brands);
      })
      .catch((error) => { });
  }, []);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [designerOpen, setDesignerOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [bykeywordOpen, setByKeywordOpen] = useState(false);

  const toggleDepartment = () => {
    setDepartmentOpen(!departmentOpen);
  };

  const toggleCategory = () => {
    setCategoryOpen(!categoryOpen);
  };

  const toggleDesigner = () => {
    setDesignerOpen(!designerOpen);
  };

  const togglePrice = () => {
    setPriceOpen(!priceOpen);
  };

  const toggleCondition = () => {
    setConditionOpen(!conditionOpen);
  };

  const toggleByKeyword = () => {
    setByKeywordOpen(!bykeywordOpen);
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDesigners, setSelectedDesigners] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  console.log(selectedDepartment);
  const filteredProducts = allProduct?.data?.filter((item) => {
    console.log(item);
    const isNameMatch = item.title.toLowerCase().includes(filter.toLowerCase());
    const isDepartmentMatch = !selectedDepartment.includes(
      item?.departmentID?.title
    );
    const isDesignerMatch = !selectedDesigners.includes(item?.brandID?.name);

    const isConditionMatch = !selectedConditions.includes(item?.condition);

    const isPriceInRange =
      (minPrice === "" || parseFloat(item.salePrice) >= parseFloat(minPrice)) &&
      (maxPrice === "" || parseFloat(item.salePrice) <= parseFloat(maxPrice));

    return (
      isNameMatch &&
      isPriceInRange &&
      isDesignerMatch &&
      isDepartmentMatch &&
      isConditionMatch
    );
  });

  return (
    <>
      <Navbar />
      <div className="w-full h-[60vh]">
        <img
          src={`${allProduct?.category?.image}`}
          className="w-full h-full object-center"
          alt=""
        />
      </div>
      <div className=" container  mt-4 md:px-5  px-3 mx-auto pb-10">
        <div className=" bg-white  py-3 z-40 sticky top-0 flex justify-between items-center">
          <div>
            <h6 className="h6">306,182 listings</h6>
          </div>

          <div className=" flex items-center gap-2">
            <div className=" md:block hidden ">
              <div className=" flex gap-4">
                <div className=" flex gap-3  items-center">
                  <p className=" m-0 font-semibold text-black text-sm">
                    Item per page
                  </p>
                  <select className="  border py-1  bg-lightGray  w-52  rounded-full p-2.5  text-primary placeholder:text-primary ">
                    <option className="">12</option>
                    <option>20</option>
                    <option>30</option>
                    <option>30</option>
                    <option>30</option>
                    <option>30</option>
                  </select>
                </div>
                <div className=" flex gap-3  items-center">
                  <p className=" m-0 font-semibold text-black text-sm">
                    Sort by
                  </p>
                  <select className="  border py-1  bg-lightGray   rounded-full p-2.5  text-primary placeholder:text-primary ">
                    <option className="">Featured</option>
                    <option>Sort by: trending</option>
                    <option>Sort by: low price</option>
                    <option>Sort by: high price</option>
                    <option>Sort by: new</option>
                    <option>Sort by: popular</option>
                  </select>
                </div>
              </div>
            </div>

            <Button
              label={"filter"}
              onClick={toggleMenu}
              className={
                "bg-black  block md:hidden uppercase text-xs py-1 font-bold  text-white"
              }
            />
          </div>
        </div>

        <div className=" flex  pt-4 gap-12">
          <div
            className={` sm:w-3/12 w-8/12   bg-white ${isMenuOpen
                ? "block  fixed  text-center lg:p-5 p-0 top-0 right-0  z-50 left-0 w-[60%] h-full bg-white"
                : "w-[20%] hidden lg:block  bg-white"
              }`}
          >
            <div className=" p-2 border-t lg:hidden block border-b flex justify-between  items-center">
              <MdClose
                size={20}
                className=" cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
              <p className="h5">filter</p>
              <span className=" text-gray-500 border-b">Clear All</span>
            </div>
            <h1 className=" text-black font-bold uppercase  hidden md:block text-xl pb-4">
              categories
            </h1>
            <div className="h-full pb-12  sm:overflow-y-hidden overflow-y-scroll">
              {/*   department */}

              <div className=" mx-auto ">
                <Accordion
                  title="Shop"
                  isOpen={departmentOpen}
                  toggleAccordion={toggleDepartment}
                >
                  <div className=" text-center  px-4"></div>
                </Accordion>
              </div>


              {/* Designer Accordion */}
              <div className="mx-auto">
                <Accordion
                  title="Brand"
                  isOpen={designerOpen}
                  toggleAccordion={toggleDesigner}
                >
                  <div className=" text-center">
                    <div className=" border  relative">
                      <input
                        placeholder="Search"
                        className="  bg-lightGray  pl-7 w-full  p-1.5 text-primary placeholder:text-primary "
                      />
                      <FiSearch className=" absolute top-2 left-1" />
                    </div>
                    <div className=" px-4 pt-3">
                      {designer?.map((item, index) => {
                        return (
                          <>
                            <div className=" flex gap-1 items-center">
                              <Input
                                checked={selectedDesigners.includes(item.name)}
                                type={"checkbox"}
                                className={""}
                                onChange={() => setSelectedDesigners(item.name)}
                              />
                              <span className=" text-sm">{item?.name}</span>
                              <span className=" bg-slate-50  text-xs">1m+</span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Accordion>
              </div>

              {/* Price Accordion */}
              <div className="mx-auto">
                <Accordion
                  title="Price"
                  isOpen={priceOpen}
                  toggleAccordion={togglePrice}
                >
                  <div className=" text-center justify-center  flex gap-2 px-4">
                    <div className=" flex gap-1 justify-center items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Min"}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>

                    <div className=" flex gap-1 items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Max"}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </Accordion>
              </div>

              {/* Price Accordion */}
              <div className="mx-auto">
                <Accordion
                  title="Color"
                  isOpen={priceOpen}
                  toggleAccordion={togglePrice}
                >
                  <div className=" text-center justify-center  flex gap-2 px-4">
                    <div className=" flex gap-1 justify-center items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Min"}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>

                    <div className=" flex gap-1 items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Max"}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </Accordion>
              </div>

              {/* Price Accordion */}
              <div className="mx-auto">
                <Accordion
                  title="Size"
                  isOpen={priceOpen}
                  toggleAccordion={togglePrice}
                >
                  <div className=" text-center justify-center  flex gap-2 px-4">
                    <div className=" flex gap-1 justify-center items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Min"}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>

                    <div className=" flex gap-1 items-center">
                      <Input
                        type={""}
                        className={" w-20 border"}
                        placeholder={"$  Max"}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </Accordion>
              </div>


              {/* By keyword Accordion */}
              <div className="mx-auto">
                <Accordion
                  title="Filter By Keyword"
                  isOpen={bykeywordOpen}
                  toggleAccordion={toggleByKeyword}
                >
                  <div className=" text-center">
                    <div className=" border  relative">
                      <input
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search"
                        className="  bg-lightGray  pl-7 w-full  p-1.5 text-primary placeholder:text-primary "
                      />
                      <FiSearch className=" absolute top-2 left-1" />
                      <FiSearch className=" absolute top-2 left-1" />
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
          <div className=" sm:w-9/12 w-12/12">
            <div className="grid item1 mx-auto col-span-2  mt-3  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-3 gap-8">
              {filteredProducts?.map((item, index) => {
                return (
                  <>
                    <CartProduct productData={item} />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categories;
