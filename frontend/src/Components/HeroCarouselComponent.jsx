import React, { useState } from "react";
import HeroSlider from "react-slick";
import { NextArrow } from "./ArrowsComponent";
import { PrevArrow } from "./ArrowsComponent";
import AImage from "../assets/AImage.png";
import BImage from "../assets/BImage.png";
import CImage from "../assets/CImage.png";
import DImage from "../assets/DImage.png";

const HeroCarousel = () => {
  const images = [AImage, BImage, CImage, DImage];
  const settingsLG = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    slideToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="lg:hidden">
        <HeroSlider>
          {images.map((image, index) => {
            return (
              <div className="w-[98%] h-56 px-2 py-3 outline-none" key={index}>
                <img
                  src={image}
                  alt="Hero banner"
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
            );
          })}
        </HeroSlider>
      </div>

      <div className="hidden lg:block">
        <HeroSlider {...settingsLG}>
          {images.map((image) => {
            return (
              <div className="w-[98%] h-96 px-2 py- outline-none overflow-hidden">
                <img
                  src={image}
                  alt="Hero banner"
                  className="w-[99%] h-full rounded-lg object-fill"
                />
              </div>
            );
          })}
        </HeroSlider>
      </div>
    </>
  );
};

export default HeroCarousel;
