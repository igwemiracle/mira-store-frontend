import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { heroData } from "../../constants";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide interval for desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroData.length - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroData.length);
  };

  return (
    <>
      {/* ======= MOBILE VERSION (xs:303px only) ======= */}
      <div className="md:hidden xs:block w-[92%] mx-auto font-amazon relative z-10">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          // these make it work nicely in simulators + real phones
          cssMode={true}
          simulateTouch={true}
          allowTouchMove={true}
          grabCursor={true}
          touchStartPreventDefault={false}
          resistanceRatio={0.5}
          threshold={12}
          className="rounded-2xl"
        >
          {heroData.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col justify-between p-2 rounded-2xl h-[500px] mt-[9rem]"
                style={{ backgroundColor: item.bgColor }}
              >
                {/* Left Text */}
                <div className="flex flex-col gap-3">
                  <h1 className="text-[35px] font-extrabold text-white leading-tight max-w-[500px]">
                    {item.title}
                  </h1>
                  <p className="text-[20px] font-extralight text-white">
                    {item.subtitle}
                  </p>
                </div>
                {/* Right Image */}
                <div className="basis-[70%]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-fit-cover "
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ======= DESKTOP VERSION (lg only, original code unchanged) ======= */}
      <Link to={"/"} className="xs:hidden md:block md:w-[100%] xl:w-[95%] mx-auto overflow-hidden font-amazon relative z-10">
        <div
          className="relative transition-transform duration-[1000ms] ease-in-out flex"
          style={{
            width: `${heroData.length * 100}%`,
            transform: `translateX(-${currentIndex * (100 / heroData.length)}%)`,
          }}
        >
          {heroData.map((item, index) => (
            <div
              key={index}

              className="flex md:items-center md:justify-center flex-shrink-0 xs:rounded-2xl md:rounded-none
            relative md:h-[300px] lg:h-[500px] xs:h-[500px] xs:mt-[9rem] md:mt-[5.6rem]"
              style={{
                width: `${100 / heroData.length}%`,
                backgroundColor: item.bgColor,
              }}
            >
              <div className="flex md:flex-row md:items-center md:justify-center md:p-0
             xs:flex-col xs:justify-between xs:p-2">

                {/* Left Text */}
                <div className="flex flex-col gap-3 lg:basis-[70%] text-center animate-bounce">
                  <h1 className="xs:text-[35px] lg:text-[45px] xl:text-[55px] font-extrabold text-white leading-tight">
                    {item.title}
                  </h1>
                  <p className="xs:text-[20px] sm:text-[28px] md:text-[30px] font-extralight text-white">
                    {item.subtitle}
                  </p>
                </div>

                {/* Right Image */}
                <div className="xs:basis-[70%] md:w-[400px] md:h-[250px] lg:w-[700px] lg:h-auto xl:w-[900px] xl:h-[550px] p-0 ">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="xs:w-full xs:h-full xs:object-fit-cover
                    md:object-contain lg:object-fit-cover xl:object-contain 
                  
                  "
                  />
                </div>
              </div>

              {/* Gradient to blend into white or site background */}
              <div className="xs:hidden sm:block 
             absolute bottom-0 left-0 w-full h-16 md:h-20 bg-gradient-to-b from-transparent to-gray-200 z-10" />
            </div>
          ))}
        </div>

        {/* Chevron Navigation */}
        <button
          onClick={goToPrev}
          className="absolute left-0.5 top-1/2 -translate-y-1/2 z-20 border-3 border-transparent focus:border-[#FDFDFD] py-6 md:py-[6.5rem]"
        >
          <ChevronLeft className="xs:hidden sm:block  w-8 h-8 xs:w-10 xs:h-10 md:w-20 md:h-20 text-[#232F3E]" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0.5 top-1/2 -translate-y-1/2 z-20 border-3 border-transparent focus:border-[#FDFDFD] py-6 md:py-[6.5rem]"
        >
          <ChevronRight className="xs:hidden sm:block w-8 h-8 xs:w-10 xs:h-10 md:w-20 md:h-20 text-[#232F3E]" />
        </button>
      </Link>
    </>
  );
}
