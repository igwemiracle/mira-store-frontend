import "./cart.css";
import React from "react";

const CartDrawer = ({ children, isDrawerOpen, toggleCartDrawer }) => {
  return (
    <div>
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        {/* Tooltip arrow */}
        <div className="absolute top-9 left-[-0.4rem] w-4 h-4 bg-white rotate-45 z-10"></div>

        {/* Cart Items Scroll Area */}
        <div className="drawer-content overflow-y-auto px-4">
          {children}
        </div>

      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-50"
          onClick={toggleCartDrawer}
        ></div>
      )}
    </div>
  );
};

export default CartDrawer;
