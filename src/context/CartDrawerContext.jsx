import { createContext, useContext, useState } from "react";

const CartDrawerContext = createContext();

export const CartDrawerProvider = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const openCartDrawer = () => setIsDrawerOpen(true);
  const closeCartDrawer = () => setIsDrawerOpen(false);

  return (
    <CartDrawerContext.Provider value={{ isDrawerOpen, toggleCartDrawer, openCartDrawer, closeCartDrawer }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => useContext(CartDrawerContext);
