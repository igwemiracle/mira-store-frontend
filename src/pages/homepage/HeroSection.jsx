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
    <Link to={"/"} className="w-[92%] mx-auto overflow-hidden font-lora relative z-10">
      <div
        className="relative transition-transform duration-[1000ms] ease-in-out"
        style={{
          width: `${heroData.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / heroData.length)}%)`,
          display: "flex",
        }}
      >
        {heroData.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full relative h-[700px] flex items-center justify-between"
            style={{
              width: `${100 / heroData.length}%`,
              backgroundColor: item.bgColor,
            }}
          >
            <div className="w-[90%] mx-auto flex items-center justify-between pt-0 pb-14">
              {/* Left Text */}
              <div className="flex flex-col gap-4 w-full lg:w-1/2 text-[#232F3E]">

                <h1 className="text-[50px] font-bold leading-13 max-w-[400px]">
                  {item.title}
                </h1>
                <p className="text-[35px] font-extralight">
                  {item.subtitle}
                </p>
              </div>

              {/* Right Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-[40%] h-auto object-contain"
              />
            </div>

            {/* Gradient to blend into white or site background */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-gray-200 z-10" />
          </div>
        ))}
      </div>

      {/* Chevron Navigation */}
      <button
        onClick={goToPrev}
        className="absolute left-[-7px] top-[37%] transform -translate-y-1/2 z-20 border-3 border-transparent hover:border-[#FDFDFD] py-[6.5rem]"
      >
        <ChevronLeft className="w-20 h-20 text-[#232F3E] " />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-[-7px] top-[37%] transform -translate-y-1/2 z-20 border-3 border-transparent hover:border-[#fdfdfd] py-[6.5rem]"
      >
        <ChevronRight className="w-20 h-20 text-[#232F3E] " />
      </button>
    </Link>
  );
}
