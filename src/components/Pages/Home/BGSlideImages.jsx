"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BGSlideImages({ images, className }) {

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  }; 

  return (
    <div className={className}>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((item, index) => {
            return (
              <Image
                className=""
                alt={item}
                key={index}
                src={`/uploads/${item}`}
                width={3200}
                height={1000}
              />
            );
          })}
        </Slider>
      ) : (
        <Image
          width={3200}
          height={1000}
          alt="hero section image"
          src={`/uploads/${images[0]}`}
          className=""
        />
      )}
    </div>
  );
}
