import React, { useEffect } from 'react';
import "./App.css";
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Homepage from './pages/homepage/Homepage';
import CategoryProducts from './pages/Category/CategoryProducts';
import Footer from './components/Layout/Footer';
import Categories from './pages/category/Categories';
import Login from './pages/auth/Login';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Header from './components/Layout/Header';
import { useDispatch } from 'react-redux';
import { getCartThunk } from './redux/slices/cartSlice';
import RegisterPage from './pages/auth/Register';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavFooterRoutes = ["/login", "/register"];
  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {!shouldHideNavFooter && <Header />}
      <div className="flex-grow flex flex-col w-full">
        {children}
      </div>
      {/* {!shouldHideNavFooter && <Footer />} */}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/parent/:id" element={<CategoryProducts />} />
          <Route path="/products/:type/:id" element={<Products />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;