import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, Sun, Moon, ArrowDown } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { images } from "../../assets/images";
import SearchBar from "../SearchBar";
import AccountDropdown from "../AccountDropdown";
import Sidebar from "./Sidebar";
import CartDrawer from "../../features/cart/CartDrawer";
import CartSlider from "../../features/cart/CartSlider";
import { getAllCategories } from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../redux/slices/cartSlice";
import { useCartDrawer } from "../../context/CartDrawerContext";
import { requireAuth } from "../../utils/authCheck";
import SignInButton from "../../components/UI/SignInButton";



const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [showTooltip, setShowTooltip] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const { isDrawerOpen, toggleCartDrawer } = useCartDrawer();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);


  useEffect(() => {
    getAllCategories().then(({ data }) =>
      setCategories(data.categories || [])
    );
  }, []);

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

  useEffect(() => {
    if (!showTooltip) return;
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#login-tooltip") &&
        !e.target.closest("#login-link")
      ) {
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

  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <header
        className={`fixed py-3 top-0 left-0 w-full z-50 bg-[#232F3E] text-[#FDFDFD] transition-transform duration-700 ease-in-out font-karla ${scrolled && scrollDirection === "down"
          ? "-translate-y-full"
          : "translate-y-0"
          }`}
      >
        <div className="flexBetweenCenter lg:w-[83%] xs:w-[100%] mx-auto">
          {/* Left: Menu + Logo */}
          <div className="flexCenter gap-4 xs:gap-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex p-2 border-2 border-transparent hover:border-[#FDFDFD] lg:hidden"
            >
              <Menu className="xs:w-8 xs:h-8 lg:w-10 lg:h-10" />
            </button>
            <Link to="/" className="xs:p-2 border-2 border-transparent hover:border-[#FDFDFD]">
              <img
                src={images.logo1}
                alt="Logo"
                className="xs:w-[90px] xs:-ml-1 lg:-ml-0 lg:w-[110px] h-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle: Search Bar (centered on larger screens) */}
          <div className="flex-1 xs:hidden lg:flex lg:justify-center px-4">
            <SearchBar placeholder="Search for a product..." />
          </div>

          {/* Right: Account + Cart */}
          <div className="flex relative">
            {/* Sign In Link */}
            <SignInButton
              user={user}
              showTooltip={showTooltip}
              setShowTooltip={setShowTooltip}
            />
            {/* Orders Link */}
            <div className="xs:hidden lg:flex justify-center items-center">
              <Link
                id="login-link"
                to="/"
                className="flex flex-col p-2 border-2 border-transparent hover:border-[#FDFDFD]"
              >
                <p className="text-[14px] font-normal">
                  Returns
                </p>
                <span className="font-semibold">& Orders</span>
              </Link>
            </div>

            {/* Shopping cart */}
            <button
              onClick={() => requireAuth(() => toggleCartDrawer())}
              className="relative lg:px-3 xs:p-2 border-2 border-transparent hover:border-[#FDFDFD] mr-3"
            >
              <ShoppingCart className="xs:w-7 xs:h-7 lg:w-12 lg:h-12" />
              {cartItemsCount > 0 && (
                <span className="flexCenter absolute -top-0.5 -right-0.5 bg-[#FA801D] text-white text-[16px]
                 lg:w-6 lg:h-6 xs:w-4 xs:h-4 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Tooltip Dropdown */}
            {showTooltip && (
              <>
                <div className="fixed mt-[12.6rem] top-[-10vh] bottom-[-100vh] right-0 left-0 bg-black/50 z-40"></div>
                <AccountDropdown
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar (below nav) */}
        <div className="xs:flex lg:hidden">
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
      />

      {/* Cart Drawer */}
      <CartDrawer isDrawerOpen={isDrawerOpen} toggleCartDrawer={toggleCartDrawer}>
        <CartSlider />
      </CartDrawer>
    </div>
  );
};
export default Header;