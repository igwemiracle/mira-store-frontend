import React from 'react';
import FourGridCard from './FourGridCard';
import SingleImageCard from './SingleImageCard';
import TwoBottomImageCard from './TwoBottomImageCard';
import CardSkeleton from '../skeletons/CardSkeleton';
import useCardsConfig from '../../hooks/useConfig';

const ShowCardGrid = () => {
  const { cards, error } = useCardsConfig();

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }


  return (
    <section className="xl:w-[95%] lg:w-[90%] mx-auto grid xs:w-[350px] xs:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {cards.length === 0
        ? [...Array(4)].map((_, idx) => <CardSkeleton key={idx} />)
        : cards.map((card, index) => {
          switch (card.type) {
            case 'grid':
              return <FourGridCard key={index} {...card} />;
            case 'singleImage':
              return <SingleImageCard key={index} {...card} />;
            case 'threeImage':
              return <TwoBottomImageCard key={index} {...card} />;
            default:
              return null;
          }
        })}
    </section>
  );
};

export default ShowCardGrid;
