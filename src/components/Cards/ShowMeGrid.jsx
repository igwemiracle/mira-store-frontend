import React, { useState, useEffect } from "react";
import FourGridCard from "./FourGridCard";
import SingleImageCard from "./SingleImageCard";
import TwoBottomImageCard from "./TwoBottomImageCard";
import CardSkeleton from "../skeletons/CardSkeleton";
import useCardsConfig from "../../hooks/useConfig";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MOBILE_MAX_PX = 640;

const ShowMeGrid = () => {
  const { cards, error } = useCardsConfig();
  const [useMobileSwiper, setUseMobileSwiper] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    const onChange = () => setUseMobileSwiper(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;

  const renderCard = (card) => {
    switch (card.type) {
      case "grid":
        return <FourGridCard {...card} />;
      case "threeImage":
        return <TwoBottomImageCard {...card} />;
      case "singleImage":
        return <SingleImageCard {...card} />;
      case "skeleton":
        return <CardSkeleton />;
      default:
        return null;
    }
  };

  const contentItems =
    cards.length === 0 ? new Array(4).fill({ type: "skeleton" }) : cards;

  // --- Mobile (Swiper) ---
  if (useMobileSwiper) {
    return (
      <div className="w-[90%] mx-auto pointer-events-auto">
        <Swiper
          slidesPerView={1.1}
          spaceBetween={12}
          // these make it work nicely in simulators + real phones
          cssMode={true}
          simulateTouch={true}
          allowTouchMove={true}
          grabCursor={true}
          touchStartPreventDefault={false}
          resistanceRatio={0.5}
          threshold={8}
        >
          {contentItems.map((item, i) => (
            <SwiperSlide key={i}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  // --- Desktop/Tablet (Grid) ---
  return (
    <section className="sm:w-[100%] xl:w-[95%] lg:w-[90%] mx-auto grid xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {contentItems.map((item, i) => (
        <React.Fragment key={i}>{renderCard(item)}</React.Fragment>
      ))}
    </section>
  );
};

export default ShowMeGrid;
