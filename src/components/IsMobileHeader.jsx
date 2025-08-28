import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
import { cn } from "../utils";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "../constants";
import React from "react";


const IsMobileDev = ({ isMenuOpen, closeMenu }) => {
  // const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        `fixed inset-x-0 top-0 w-full h-[50vh] ss:h-[400px] z-[9999] bg-white p-4 shadow-lg transform transition-transform duration-500 ease-in-out`,
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}
    >

      <div>
        <div className="flexCenterBetween">
          <Link to={"/"} onClick={closeMenu} className="font-lobster ss:text-base sm:text-[18px] lg:text-[24px]">
            Foodieland<span className="text-[orange]">.</span>
          </Link>
          <div>
            <X size={30} className="ss:text-[96px] cursor-pointer" onClick={closeMenu} />
          </div>
        </div>
        {/* NavLinks Section */}
        <div className="flex flex-col gap-6 justify-start mt-4">
          {navLinks.map((navlink) => (
            <Link key={navlink.id} to={navlink.path} className="ss:text-xs sm:text-[16px]" onClick={closeMenu}>
              {navlink.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      {/* <div className="flex flex-col items-center gap-8 mt-14">
        <div className={cn("text-gray-500 ss:text-[10px] sm:text-[12px]")}>
          © 2020 Flowbase. Powered by
          <span className="text-[#FF7967]"> Webflow</span>
          <div className="flexCenter">
            <SocialIcons className="my-4" />
          </div>
        </div>
      </div> */}
    </div>
  );
};



export default IsMobileDev;