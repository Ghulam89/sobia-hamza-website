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
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get query parameters or use defaults
  const brandParam = queryParams.get('brand') || "";
  const minPriceParam = queryParams.get('minPrice') || "";
  const maxPriceParam = queryParams.get('maxPrice') || "";
  const categoryParam = queryParams.get('category') || "";
  const subCategoryParam = queryParams.get('subCategory') || "";
  const sizeParam = queryParams.get('size') || "";
  const titleParam = queryParams.get('title') || "";
  const sortParam = queryParams.get('sort') || "featured";
  const pageParam = queryParams.get('page') || 1;
  const limitParam = queryParams.get('limit') || 12;

  const [allProduct, setAllProduct] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filter, setFilter] = useState(titleParam);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subsubCategory, setSubSubCategory] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [designer, setDesigner] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  // State for filters with initial values from query params
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [selectedDesigners, setSelectedDesigners] = useState(brandParam ? brandParam.split(',') : []);
  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? categoryParam.split(',') : []);
  const [selectedSubCategories, setSelectedSubCategories] = useState(subCategoryParam ? subCategoryParam.split(',') : []);
  const [selectedSizes, setSelectedSizes] = useState(sizeParam ? sizeParam.split(',') : []);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOption, setSortOption] = useState(sortParam);
  const [currentPage, setCurrentPage] = useState(Number(pageParam));
  const [itemsPerPage, setItemsPerPage] = useState(Number(limitParam));

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [designerOpen, setDesignerOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [bykeywordOpen, setByKeywordOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
    fetchSizes();
    fetchColors();
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedDesigners.length > 0) params.set('brand', selectedDesigners.join(','));
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
    if (selectedSubCategories.length > 0) params.set('subCategory', selectedSubCategories.join(','));
    if (selectedSizes.length > 0) params.set('size', selectedSizes.join(','));
    if (filter) params.set('title', filter);
    if (sortOption !== "featured") params.set('sort', sortOption);
    if (currentPage !== 1) params.set('page', currentPage);
    if (itemsPerPage !== 12) params.set('limit', itemsPerPage);
    
    navigate({ search: params.toString() }, { replace: true });
    fetchProducts();
  }, [
    selectedDesigners,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedSubCategories,
    selectedSizes,
    filter,
    sortOption,
    currentPage,
    itemsPerPage
  ]);

  const fetchProducts = () => {
    let url = `${Base_url}/products/getAll?page=${currentPage}&limit=${itemsPerPage}`;
    
    // Add filters to the URL
    if (selectedDesigners.length > 0) url += `&brand=${selectedDesigners.join(',')}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (selectedCategories.length > 0) url += `&category=${selectedCategories.join(',')}`;
    if (selectedSubCategories.length > 0) url += `&subCategory=${selectedSubCategories.join(',')}`;
    if (selectedSizes.length > 0) url += `&size=${selectedSizes.join(',')}`;
    if (filter) url += `&title=${filter}`;
    if (sortOption) url += `&sort=${sortOption}`;

    axios.get(url)
      .then((res) => {
        setAllProduct(res?.data?.data?.data || []);
        setTotalProducts(res?.data?.data?.total || 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCategories = () => {
    axios.get(`${Base_url}/category/getAll`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`${Base_url}/subCategory/getAll`)
      .then((res) => {
        setSubCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBrands = () => {
    axios.get(`${Base_url}/brands/getAll`)
      .then((res) => {
        setDesigner(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSizes = () => {
    axios.get(`${Base_url}/sizes/getAll`)
      .then((res) => {
        setSizes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchColors = () => {
    axios.get(`${Base_url}/colors/getAll`)
      .then((res) => {
        setColors(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleDepartment = () => setDepartmentOpen(!departmentOpen);
  const toggleCategory = () => setCategoryOpen(!categoryOpen);
  const toggleDesigner = () => setDesignerOpen(!designerOpen);
  const togglePrice = () => setPriceOpen(!priceOpen);
  const toggleColor = () => setColorOpen(!colorOpen);
  const toggleSize = () => setSizeOpen(!sizeOpen);
  const toggleByKeyword = () => setByKeywordOpen(!bykeywordOpen);

  const handleDesignerChange = (designerName) => {
    setSelectedDesigners(prev => 
      prev.includes(designerName) 
        ? prev.filter(name => name !== designerName) 
        : [...prev, designerName]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategoryId) 
        ? prev.filter(id => id !== subCategoryId) 
        : [...prev, subCategoryId]
    );
    setCurrentPage(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
    setCurrentPage(1);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedDesigners([]);
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice("");
    setMaxPrice("");
    setFilter("");
    setSortOption("featured");
    setCurrentPage(1);
    setItemsPerPage(12);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currentPage - half;
      let end = currentPage + half;
      
      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }
      
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <>
      <Navbar />
      <div className="container md:px-5 px-3 mx-auto pb-10">
        <div className="bg-white py-3 z-40 sticky top-0 flex justify-between items-center">
          <div>
            <h6 className="h6">{allProduct?.length} listings</h6>
          </div>

          <div className="flex items-center gap-2">
            <div className="md:block hidden">
              <div className="flex gap-4">
                <div className="flex gap-3 items-center">
                  <p className="m-0 font-semibold text-black text-sm">Item per page</p>
                  <select 
                    className="border py-1 bg-lightGray w-52 rounded-full p-2.5 text-primary placeholder:text-primary"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                  </select>
                </div>
                <div className="flex gap-3 items-center">
                  <p className="m-0 font-semibold text-black text-sm">Sort by</p>
                  <select 
                    className="border py-1 bg-lightGray rounded-full p-2.5 text-primary placeholder:text-primary"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
              
                    <option value="price-asc">Price - Low to High</option>
                    <option value="price-desc">Price - High to Low</option>
                    <option value="releaseDate-asc">Release date - Oldest</option>
                    <option value="releaseDate-des">Release date - Newest</option>
                   
                  </select>
                </div>
              </div>
            </div>

            <Button
              label={"filter"}
              onClick={toggleMenu}
              className={"bg-black block md:hidden uppercase text-xs py-1 font-bold text-white"}
            />
          </div>
        </div>

        <div className="flex pt-4 gap-12">
          {/* Filters Sidebar */}
          <div className={`sm:w-3/12 w-8/12 bg-white ${
            isMenuOpen
              ? "block fixed text-center lg:p-5 p-0 top-0 right-0 z-50 left-0 w-[60%] h-full bg-white"
              : "w-[20%] hidden lg:block bg-white"
          }`}>
            <div className="p-2 border-t lg:hidden block border-b flex justify-between items-center">
              <MdClose
                size={20}
                className="cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
              <p className="h5">filter</p>
              <span className="text-gray-500 border-b cursor-pointer" onClick={clearAllFilters}>
                Clear All
              </span>
            </div>
            <h1 className="text-black font-bold uppercase hidden md:block text-xl pb-4">
              categories
            </h1>
            <div className="h-full pb-12 sm:overflow-y-hidden overflow-y-scroll">
              {/* Search by Keyword */}
              <div className="mx-auto">
                <Accordion
                  title="Search by Keyword"
                  isOpen={bykeywordOpen}
                  toggleAccordion={toggleByKeyword}
                >
                  <div className="text-center">
                    <div className="border relative">
                      <input
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        placeholder="Search"
                        className="bg-lightGray pl-7 w-full p-1.5 text-primary placeholder:text-primary"
                      />
                      <FiSearch className="absolute top-2 left-1" />
                    </div>
                  </div>
                </Accordion>
              </div>

              {/* Brand Filter */}
              <div className="mx-auto">
                <Accordion
                  title="Category"
                  isOpen={designerOpen}
                  toggleAccordion={toggleDesigner}
                >
                  <div className="text-center">
                    <div className="border relative">
                      <input
                        placeholder="Search brands"
                        className="bg-lightGray pl-7 w-full p-1.5 text-primary placeholder:text-primary"
                      />
                      <FiSearch className="absolute top-2 left-1" />
                    </div>
                    <div className="px-4 pt-3">
                      {designer?.map((item, index) => (
                        <div key={index} className="flex gap-1 items-center">
                          <Input
                            checked={selectedDesigners.includes(item.name)}
                            type={"checkbox"}
                            onChange={() => handleDesignerChange(item.name)}
                          />
                          <span className="text-sm">{item?.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Accordion>
              </div>

              {/* Price Filter */}
              <div className="mx-auto">
                <Accordion
                  title="Price"
                  isOpen={priceOpen}
                  toggleAccordion={togglePrice}
                >
                  <div className="text-center justify-center flex gap-2 px-1">
                    <div className="flex gap-1 justify-center items-center">
                      <Input
                        type={"number"}
                        className={" w-full border"}
                        placeholder={"$ Min"}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-1 items-center">
                      <Input
                        type={"number"}
                        className={" w-full border"}
                        placeholder={"$ Max"}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="sm:w-9/12 w-12/12">
            {allProduct.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg">No products found matching your filters</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid item1 mx-auto col-span-2 mt-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                  {allProduct?.map((item, index) => (
                    <CartProduct key={index} productData={item} />
                  ))}
                </div>
                
               
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {getPageNumbers().map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                            currentPage === page 
                              ? 'bg-black text-white' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;