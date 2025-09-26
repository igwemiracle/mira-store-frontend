import React, { useEffect } from 'react';
import "./App.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Footer from './components/Layout/Footer';
import Login from './pages/auth/Login';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Header from './components/Layout/Header';
import { useDispatch } from 'react-redux';
import { getCartThunk } from './redux/slices/cartSlice';
import RegisterPage from './pages/auth/Register';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Categories from './pages/Categories';



const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavFooterRoutes = ["/login", "/register"];
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 md:w-[100%] sm:w-[113%]">
      {!shouldHideNavFooter && <Header />}
      <div className="flex-grow flex flex-col w-full">
        {children}
      </div>
      {!shouldHideNavFooter && <Footer />}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/parent/:id" element={<Categories />} />
        <Route path="/products/:type/:id" element={<Products />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
      </Routes>
    </AppLayout>
  );
};

export default App;