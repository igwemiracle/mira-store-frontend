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
}) => {
  const navigate = useNavigate();
  const validSlides = data.filter((item) => getId(item) && getImage(item));

  return (
    <section className="space-y-6 lg:mt-0 relative xs:w-[95%] sm:w-[95%] lg:w-[95%] mx-auto my-6">

      <div className="bg-white p-6">
        <h1 className="text-[22px] font-bold font-lato mb-3">{title}</h1>
        {loading ? (
          <SwiperSkeleton />
        ) : validSlides.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation={validSlides.length > 1}
            loop={validSlides.length > 6} // or >3 depending on how many items you have
            spaceBetween={15}

            cssMode={true}
            simulateTouch={true}
            allowTouchMove={true}
            grabCursor={true}
            touchStartPreventDefault={false}
            resistanceRatio={0.5}
            threshold={8}

            /* 👇 main trick */
            breakpoints={{
              // xs:303px
              303: {
                slidesPerView: 1.15,
                centeredSlides: false,
              },
              // small phones ~640px
              640: {
                slidesPerView: 2.15,
                centeredSlides: false,
              },
              // md screens ~768px
              768: {
                slidesPerView: 4.15, // 4 + peek
                centeredSlides: false,
              },
              // lg screens ~1024px
              1024: {
                slidesPerView: 6.15, // 6 + peek
                centeredSlides: false,
              },
            }}
          >
            {validSlides.map((item) => {
              const id = getId(item);
              const image = getImage(item);
              return (
                <SwiperSlide className="xs:!w-[80%] sm:!w-[40%] md:!w-[22%] lg:!w-[15%]" key={id}>

                  <div
                    onClick={() =>
                      onSlideClick ? onSlideClick(id) : navigate(`/product/${id}`)
                    }
                    className="cursor-pointer"
                  >

                    <img
                      src={image}
                      alt="Product"
                      className="w-full h-56 object-cover rounded-lg shadow"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>


        ) : (
          <p className="text-gray-500">No items to display in this slider.</p>
        )}
      </div>

    </section>
  );
};

export default SwiperSlider;
