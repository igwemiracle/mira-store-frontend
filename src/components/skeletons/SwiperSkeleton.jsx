import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperSkeleton = ({ count = 6 }) => {
  const placeholders = Array.from({ length: count });

  return (
    <section className="mt-8">
      <Swiper
        slidesPerView={2}
        spaceBetween={12}
        breakpoints={{
          303: { slidesPerView: 2, spaceBetween: 12 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {placeholders.map((_, i) => (
          <SwiperSlide key={i}>
            <div className="h-60 bg-gray-300 animate-pulse rounded-lg shadow w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SwiperSkeleton;
