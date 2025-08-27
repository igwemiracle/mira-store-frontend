import { images } from '../assets/images/index'


export const heroData = [
  {
    title: "Kitchen essentials Under $50",
    price: "$20",
    image: images.kitchen,
    bgColor: "#e1e597",
    buttonText: "Shop Now",
  },
  {
    title: "Toys for little ones",
    price: "$30",
    image: images.toys,
    bgColor: "#FA801D",
    buttonText: "Shop Toys",
  },
  {
    title: "Fashion finds under $50",
    price: "$55",
    image: images.fashion,
    bgColor: "#DDA5F5",
    buttonText: "Shop Tablets",
  },
  {
    title: "Gaming store",
    subtitle: " Upgrade your gaming gear",
    price: "$45",
    image: images.gaming,
    bgColor: "#cfe4ff",
    buttonText: "See More",
  },
];

export const books = [
  { id: 1, image: images.nfb1 },
  { id: 2, image: images.nfb2 },
  { id: 3, image: images.nfb3 },
  { id: 4, image: images.nfb4 },
  { id: 5, image: images.nfb6 },
  { id: 6, image: images.nfb7 },
  { id: 7, image: images.nfb8 },
  { id: 8, image: images.nfb9 },
  { id: 9, image: images.nfb10 },
  { id: 10, image: images.nfb11 },
  { id: 11, image: images.nfb12 },
  { id: 12, image: images.nfb13 },
  { id: 13, image: images.nfb14 },
  { id: 14, image: images.nfb15 },
  { id: 15, image: images.nfb5 },

];

export const clothes = [
  { id: 1, image: images.mdress1 },
  { id: 2, image: images.mdress2 },
  { id: 3, image: images.mshoe1 },
  { id: 4, image: images.mshoe2 },
  { id: 5, image: images.mwatch1 },
  { id: 6, image: images.mwatch2 },
  { id: 7, image: images.mwatch3 },
  { id: 8, image: images.wbag },
  { id: 9, image: images.womendress1 },
  { id: 10, image: images.womendress2 },
  { id: 11, image: images.womenshoe1 },
  { id: 12, image: images.womenshoe2 },
  { id: 13, image: images.womenwatch1 },
  { id: 14, image: images.womenwatch2 },
  { id: 15, image: images.womenwatch3 },
]

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
