import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Bunner = () => {
  // Ajustando para exibir 1 item por slide em todas as resoluções
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="w-[70vw] mx-auto">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        arrows={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5s"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        // classes para centralizar o conteúdo de cada item
        itemClass="carousel-item-padding-40-px flex justify-center items-center"
      >
        {[
          "/images/bunner-01.webp",
          "/images/bunner-02.png",
          "/images/bunner-03.png",
          "/images/bunner-04.webp",
        ].map((src, index) => (
          <div
            key={index}
            className="w-[80vw] h-[200px] flex justify-center items-center"
          >
            <Image
              className="object-cover"
              src={src}
              alt={`Banner ${index + 1}`}
              width={800}
              height={200}
              layout="responsive"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
