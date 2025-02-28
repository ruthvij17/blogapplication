import React from "react";
import Slider from "react-slick";
import Poster from "./PosterComponent";
import { NextArrow, PrevArrow } from "./ArrowsComponent";
const PosterSlider = (props) => {
  const { blogs, isDark } = props;

  const settings = {
    infinite: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {blogs &&
          blogs.map((each, index) => (
            <Poster {...each} isDark={isDark} key={index} />
          ))}
      </Slider>
    </>
  );
};

export default PosterSlider;
