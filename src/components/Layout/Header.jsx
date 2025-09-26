import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { images } from "../../assets/images";
import SearchBar from "../SearchBar";
import AccountDropdown from "../AccountDropdown";
import Sidebar from "./Sidebar";
import CartDrawer from "../../features/cart/CartDrawer";
import CartSlider from "../../features/cart/CartSlider";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../redux/slices/cartSlice";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { requireAuth } from "../../utils/authCheck";
import SignInButton from "../../components/UI/SignInButton";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/categoryService";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [showTooltip, setShowTooltip] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  const { isDrawerOpen, toggleCartDrawer } = useCartDrawer();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Fetch cart data on mount
  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  // Fetch categories with React Query (cached)
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await getAllCategories();
      return data.categories || [];
    },
    staleTime: 1000 * 60 * 10, // don't refetch for 10 minutes
    cacheTime: 1000 * 60 * 30, // keep cache alive for 30 minutes
  });

  // Track scroll direction for header animation
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setScrolled(currentScrollY > 50);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!showTooltip) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest("#login-tooltip") && !e.target.closest("#login-link")) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showTooltip]);

  const toggleCategory = (id) =>
    setExpandedCategoryId((prev) => (prev === id ? null : id));

  const handleCategoryClick = (category) => {
    if (category.subcategories?.length) {
      toggleCategory(category._id);
    } else {
      setIsMenuOpen(false);
      window.location.href = `/products/parent/${category._id}`;
    }
  };

  return (
    <>
      <header
        className={`fixed py-3 top-0 left-0 w-full z-50 bg-[#232F3E] text-[#FDFDFD] transition-transform duration-700 ease-in-out font-karla ${scrolled && scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          }`}
      >
        <div className="flex-c-between lg:w-[90%] xs:w-[100%] mx-auto">
          {/* Left: Menu + Logo */}
          <div className="flex-center gap-4 xs:gap-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex p-2 lg:border-2 lg:border-transparent lg:hover:border-[#FDFDFD] lg:hidden"
            >
              <Menu className="xs:w-8 xs:h-8 lg:w-10 lg:h-10" />
            </button>
            <Link to="/" className="xs:p-2 lg:border-2 lg:border-transparent lg:hover:border-[#FDFDFD]">
              <img
                src={images.logo1}
                alt="Logo"
                className="xs:w-[90px] xs:-ml-1 lg:-ml-0 lg:w-[110px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle: Search Bar */}
          <div className="flex-1 xs:hidden sm:flex lg:justify-center px-4">
            <SearchBar placeholder="Search for a product..." />
          </div>

          {/* Right: Account + Cart */}
          <div className="flex relative">
            <SignInButton
              user={user}
              showTooltip={showTooltip}
              setShowTooltip={setShowTooltip}
            />

            {/* Overlay for click outside (mobile + desktop) */}
            {showTooltip && (
              <div
                className="fixed inset-0 h-[120vh] bg-black/50 z-40"
                onClick={() => setShowTooltip(false)}
              ></div>
            )}

            {/* Dropdown attached below button */}
            <div
              className={`absolute top-full sm:right-[2%] lg:right-[9%] mt-2 z-50 transform transition-all duration-300 ease-out p-6 w-96 bg-white rounded-b-md shadow-xl ${showTooltip
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-3 pointer-events-none'
                }`}
            >
              <AccountDropdown />
            </div>

            <div className="xs:hidden sm:flex justify-center items-center">
              <Link
                id="login-link"
                to="/orders"
                className="flex flex-col p-2 border-2 border-transparent hover:border-[#FDFDFD]"
              >
                <p className="text-[14px] font-normal">Returns</p>
                <span className="font-semibold">& Orders</span>
              </Link>
            </div>

            {/* Shopping Cart */}
            <button
              onClick={() => requireAuth(() => toggleCartDrawer())}
              className="relative lg:px-3 xs:p-2 lg:border-2 lg:border-transparent lg:hover:border-[#FDFDFD] mr-3"
            >
              <ShoppingCart className="xs:w-7 xs:h-7 lg:w-12 lg:h-12" />
              {cartItemsCount > 0 && (
                <span className="flex-center absolute -top-0.5 -right-0.5 bg-[#FA801D] text-white text-[16px]
                  lg:w-6 lg:h-6 xs:w-5 xs:h-5 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="xs:flex sm:hidden">
          <SearchBar placeholder="Search for a product..." />
        </div>
      </header>

      {/* Sidebar Drawer */}
      <Sidebar
        user={user}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        categories={categories}
        expandedId={expandedCategoryId}
        toggleCategory={toggleCategory}
        handleCategoryClick={handleCategoryClick}
        isLoading={isLoading}
        isError={isError}
      />

      {/* Cart Drawer */}
      <CartDrawer isDrawerOpen={isDrawerOpen} toggleCartDrawer={toggleCartDrawer}>
        <CartSlider />
      </CartDrawer>
    </>
  );
};

export default Header;