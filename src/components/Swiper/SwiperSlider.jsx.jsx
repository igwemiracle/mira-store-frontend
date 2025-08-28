import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import SwiperSkeleton from "../../components/skeletons/SwiperSkeleton"

const SwiperSlider = ({
  title = "Slider",
  data = [],
  getImage,
  getId,
  onSlideClick,
  loading = false,
  breakpoints = {
    303: { slidesPerView: 1.2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  },
}) => {
  const navigate = useNavigate();
  const validSlides = data.filter((item) => getId(item) && getImage(item));

  return (
    <section className="w-[90%] mx-auto my-12 relative">
      <h1 className="text-[30px] font-bold mb-4 font-lato">{title}</h1>

      {loading ? (
        <SwiperSkeleton />
      ) : validSlides.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation={validSlides.length > 1}
          loop={validSlides.length > 3}
          spaceBetween={15}
          slidesPerView={3}
          breakpoints={breakpoints}
          cssMode={true}             // native scroll under the hood (works with mouse/touch)
          simulateTouch={true}       // allow mouse-drag on desktop
          allowTouchMove={true}
          grabCursor={true}
          touchStartPreventDefault={false}
          resistanceRatio={0.5}
          threshold={8}
        >
          {validSlides.map((item) => {
            const id = getId(item);
            const image = getImage(item);
            return (
              <SwiperSlide key={id}>
                <div
                  onClick={() =>
                    onSlideClick ? onSlideClick(id) : navigate(`/product/${id}`)
                  }
                  className="cursor-pointer"
                >
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-56 object-fit-cover rounded-lg shadow"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-gray-500">No items to display in this slider.</p>
      )}
    </section>
  );
};

export default SwiperSlider;
