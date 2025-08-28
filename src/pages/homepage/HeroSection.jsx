import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroData } from "../../constants";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide interval: 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Manual navigation handlers
  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? heroData.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroData.length);
  };

  return (
    <Link to={"/"} className="w-[92%] mx-auto overflow-hidden font-amazon relative z-10">
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

            className="flex lg:items-center lg:justify-center flex-shrink-0 xs:rounded-2xl lg:rounded-none
            relative lg:h-[500px] xs:h-[500px] xs:mt-[9rem] lg:mt-[5.9rem]"
            style={{
              width: `${100 / heroData.length}%`,
              backgroundColor: item.bgColor,
            }}
          >
            <div className="flex lg:flex-row lg:items-center lg:justify-center lg:p-0
             xs:flex-col xs:justify-between xs:p-2">

              {/* Left Text */}
              <div className="flex flex-col gap-3 lg:w-[70%] md:text-left">
                <h1 className="xs:text-[35px] lg:text-[50px] font-extrabold text-white leading-tight max-w-[500px]">
                  {item.title}
                </h1>
                <p className="xs:text-[20px] sm:text-[28px] md:text-[35px] font-extralight text-white">
                  {item.subtitle}
                </p>
              </div>

              {/* Right Image */}
              <div className="xs:basis-[70%] lg:w-[900px] lg:h-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  // className=" w-[200%] h-[150%] object-fill"
                  className="xs:w-full xs:h-full xs:object-fit-cover 
                  lg:object-contain 
                
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
        className="absolute left-0.5 top-1/2 -translate-y-1/2 z-20 border-3 border-transparent hover:border-[#FDFDFD] py-6 md:py-[6.5rem]"
      >
        <ChevronLeft className="xs:hidden sm:block  w-8 h-8 xs:w-10 xs:h-10 md:w-20 md:h-20 text-[#232F3E]" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0.5 top-1/2 -translate-y-1/2 z-20 border-3 border-transparent hover:border-[#FDFDFD] py-6 md:py-[6.5rem]"
      >
        <ChevronRight className="xs:hidden sm:block w-8 h-8 xs:w-10 xs:h-10 md:w-20 md:h-20 text-[#232F3E]" />
      </button>
    </Link>
  );
}
