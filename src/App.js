
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/home';
import ProductDetails from './screens/productDetails';
import Shop from './screens/shop';
import Categories from './screens/categories';
import Blogs from './screens/blogs/Blogs';
import BlogDetails from './screens/blogDetails';
import Faqs from './screens/faqs/Faqs';
import Cart from './screens/cart';
import ContactUs from './screens/contactus';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route  path='/' element={<Home/>} />
      <Route  path='/product_details/:id' element={<ProductDetails/>} />
      <Route  path='/shop' element={<Shop/>} />
      <Route  path='/categories/:id' element={<Categories/>} />
      <Route  path='/blog' element={<Blogs/>} />
      <Route  path='/blog_details/:id' element={<BlogDetails/>} />
      <Route  path='/faqs' element={<Faqs/>} />
      <Route  path='/contact-us' element={<ContactUs/>} />
      <Route  path='/cart' element={<Cart/>} />
    </Routes>
    </>
  );
}

export default App;
