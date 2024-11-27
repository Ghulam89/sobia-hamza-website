import React from "react";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from '../../assets/images/sliderImg_1.webp';
import sliderImg_2 from '../../assets/images/sliderImg_2.webp';
import sliderImg_3 from '../../assets/images/sliderImg_3.webp';
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Banner = () => {
  return (
    <>
      <div className="relative">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src={sliderImg_1} className="h-auto" alt="Slide 1" />
          </div>
          <div>
            <img src={sliderImg_2} className="h-auto" alt="Slide 2" />
          </div>
          <div>
            <img src={sliderImg_3} className="h-auto" alt="Slide 3" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
