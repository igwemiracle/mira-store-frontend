import React, { useState } from "react";
import { MdSupportAgent } from 'react-icons/md';
import useCategoryProducts from "../../hooks/useCategoryProducts.js";
import SwiperSlider from "../../components/Swiper/SwiperSlider.jsx";
import ShowCardGrid from '../../components/Cards/ShowCardGrid.jsx'
import HeroSection from "./HeroSection.jsx";
import ShowMeGrid from "../../components/Cards/ShowMeGrid.jsx";

const Homepage = () => {
  const { products: babyItems, loading: babyLoading } = useCategoryProducts({
    parentCategoryName: "Baby",
    subCategoryName: "Diapering",
  });

  const { products: videoGames, loading: videoGamesLoading } = useCategoryProducts({
    parentCategoryName: "Video Games",
    subCategoryName: "Digital Games",
  });

  const { products: fashion, loading: fashionLoading } = useCategoryProducts({
    parentCategoryName: "Fashion",
    subCategoryName: "Men's Fashion",
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Services section */}
      <section className="xs:hidden sm:-mt-[5rem] lg:-mt-[7rem] relative z-20 sm:flex flex-wrap 
       sm:w-[95%] mx-auto justify-between gap-4">
        {[
          {
            icon: (
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl text-black" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
                <path d="M3 9l4 0"></path>
              </svg>
            ),
            title: 'Free Delivery',
            desc: 'Orders from all items'
          },
          {
            icon: (
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2rem" width="2rem" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0049 2C17.5277 2 22.0049 6.47715 22.0049 12C22.0049 17.5228 17.5277 22 12.0049 22C9.57847 22 7.3539 21.1358 5.62216 19.6985L5.37815 19.4892L6.27949 17.5875C7.73229 19.0759 9.76067 20 12.0049 20C16.4232 20 20.0049 16.4183 20.0049 12C20.0049 7.58172 16.4232 4 12.0049 4C7.66997 4 4.14034 7.44784 4.00869 11.7508L4.00488 12H6.50488L3.79854 17.7161C2.66796 16.096 2.00488 14.1254 2.00488 12C2.00488 6.47715 6.48204 2 12.0049 2ZM13.0049 6V8H15.5049V10H10.0049C9.72874 10 9.50488 10.2239 9.50488 10.5C9.50488 10.7455 9.68176 10.9496 9.91501 10.9919L10.0049 11H14.0049C15.3856 11 16.5049 12.1193 16.5049 13.5C16.5049 14.8807 15.3856 16 14.0049 16H13.0049V18H11.0049V16H8.50488V14H14.0049C14.281 14 14.5049 13.7761 14.5049 13.5C14.5049 13.2545 14.328 13.0504 14.0948 13.0081L14.0049 13H10.0049C8.62417 13 7.50488 11.8807 7.50488 10.5C7.50488 9.11929 8.62417 8 10.0049 8H11.0049V6H13.0049Z"></path>
              </svg>
            ),
            title: 'Return & Refund',
            desc: 'Money back guarantee'
          },
          {
            icon: (
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-4xl text-black" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 15l6 -6"></path>
                <circle cx="9.5" cy="9.5" r=".5" fill="currentColor"></circle>
                <circle cx="14.5" cy="14.5" r=".5" fill="currentColor"></circle>
                <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
              </svg>
            ),
            title: 'Member Discount',
            desc: 'On order over $99'
          },
          {
            icon: <MdSupportAgent size={35} />,
            title: 'Support 24/7',
            desc: 'Contact us 24 hours a day'
          }
        ].map((item, i) => (
          <div key={i} className="flex items-start bg-white gap-3 sm:p-2 lg:py-8 px-1 xl:py-6 flex-1 w-[300px]">
            {item.icon}
            <div>
              <p className="sm:text-[12px] md:text-[14px] lg:text-[19px] xl:text-[20px] font-medium font-karla">
                {item.title}</p>
              <p className="sm:text-[10px] md:text-[10px] lg:text-[14px] xl:text-[17px] font-normal font-karla text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="space-y-8 lg:mt-0 relative z-10">

        {/* Slide card grid */}
        <ShowMeGrid />

        {/* Show card grid */}
        <ShowCardGrid />

        {/* Swiper Slider */}
        <div>
          <SwiperSlider
            title="Top in Baby Products"
            data={babyItems}
            getId={(item) => item._id}
            getImage={(item) => item.images?.[0]?.url}
            loading={babyLoading}
            breakpoints={{
              303: { slidesPerView: 1.2 },
              320: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          />

          <SwiperSlider
            title="Trending Video Games"
            data={videoGames}
            getId={(game) => game._id}
            getImage={(game) => game.images?.[0]?.url}
            loading={videoGamesLoading}
            breakpoints={{
              303: { slidesPerView: 1.2 },
              320: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          />
          <SwiperSlider
            title="Best Sellers in Clothing, Shoes & Jewelry"
            data={fashion}
            getId={(fashion) => fashion._id}
            getImage={(fashion) => fashion.images?.[0]?.url}
            loading={fashionLoading}
            breakpoints={{
              303: { slidesPerView: 1.2 },
              320: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;