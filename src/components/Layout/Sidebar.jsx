import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ user, isOpen, onClose, categories, expandedId, handleCategoryClick, }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex-c-between p-4 border-b border-gray-200 bg-[#242f40] text-white">
          <p className="text-base font-medium">
            Browse <br />
            <span className="text-[26px] font-semibold">Mira Store</span>
          </p>
          <button
            onClick={onClose}
            className="text-3xl font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-64px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 tracking-wide">
            Shop by Department
          </h3>
          <ul className="space-y-2">
            {categories.length ? (
              categories.map((category) => {
                const hasSub = category.subcategories?.length > 0;
                const isExpanded = expandedId === category._id;

                return (
                  <li key={category._id}>
                    <div
                      className="flex-c-between px-2 py-2 rounded hover:bg-gray-100"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <span className="text-gray-700 font-medium">
                        {category.name}
                      </span>
                      {hasSub && (
                        <ChevronRight
                          size={18}
                          className={`text-gray-400 transition-transform ${isExpanded ? "rotate-90" : ""
                            }`}
                        />
                      )}
                    </div>

                    {hasSub && (
                      <ul
                        className={`ml-4 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        {category.subcategories.map((sub) => (
                          <li key={sub._id}>
                            <Link
                              to={`/products/subcategory/${sub._id}`}
                              className="block px-2 py-1 text-sm text-gray-600 rounded hover:bg-blue-50 hover:text-blue-600"
                              onClick={onClose}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="text-sm text-gray-500 animate-pulse">Loading...</li>
            )}
          </ul>

          <h3 className="text-sm font-semibold text-gray-500 uppercase mt-8 mb-3 tracking-wide">
            Programs & Features
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {[
              "Gift Cards",
              "Shop By Interest",
              "International Shopping",
              "See all",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-blue-600 transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold text-gray-500 uppercase mt-8 mb-3 tracking-wide">
            Help & Settings
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="hover:text-blue-600 transition-colors">
              Your Account
            </li>
            <li className="hover:text-blue-600 transition-colors">
              English
            </li>
          </ul>
        </nav>
      </aside >
    </>
  );
}
