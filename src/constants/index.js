import { images } from '../assets/images/index'

export const heroData = [
  {
    title: "Kitchen essentials Under $50",
    image: images.kitchen,
    bgColor: "#e1e597",
  },
  {
    title: "Toys for little ones",
    image: images.toys,
    bgColor: "#FA801D",
  },
  {
    title: "Fashion finds under $50",
    image: images.fashion,
    bgColor: "#DDA5F5",
  },
  {
    title: "All things beauty",
    image: images.beauty,
    bgColor: "#e6bac7",
  },
  {
    title: "Gaming store",
    subtitle: " Upgrade your gaming gear",
    image: images.ggm,
    bgColor: "#e8dacf",
  },
];

export const menuItems = (closeDrawer, onSignOut, navigate) => [
  {
    label: "Switch Accounts",
    onClick: closeDrawer
  },
  {
    label: "Sign Out",
    onClick: () => {
      onSignOut?.();
      closeDrawer();
    },
    textClass: "text-red-600"
  },
  {
    label: "WishList",
    onClick: () => { navigate("/wishlist"); closeDrawer(); }
  },
  {
    label: "Orders",
    onClick: () => { navigate("/orders"); closeDrawer(); }
  },
  {
    label: "Your returns",
    onClick: () => { navigate("/returns"); closeDrawer(); }
  },
  {
    label: "Customer service",
    onClick: () => { navigate("/support"); closeDrawer(); }
  },
];
