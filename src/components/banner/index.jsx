import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from '../../assets/images/sliderImg_1.webp';
import sliderImg_2 from '../../assets/images/sliderImg_2.webp';
import sliderImg_3 from '../../assets/images/sliderImg_3.webp';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";

const Banner = () => {
  const [banner,setBanner] = useState([]);
  
  useEffect(() => {
    
    axios
      .get(`${Base_url}/slider/getAll`)
      .then((res) => {
        console.log(res);

        setBanner(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {banner?.map((item,index)=>{
            return (
              <div>
              <img src={item?.slider} className="h-auto" alt="Slide 1" />
            </div>
            )
          })}
         
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
