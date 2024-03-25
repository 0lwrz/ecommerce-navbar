import React from "react";
import "./Slider.css";
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { NavLink } from "react-router-dom";

export default function Slider() {
  return (
    <>
      <div className="swiper">
        <Swiper
          modules={[Navigation, A11y , Autoplay]}
          autoplay={true }
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation
        >
          <SwiperSlide>
            <img
              src="swiper-img-1.jpg"
              alt="swiper-img-1"
              className="img-swiper"
            />
            <div className="container">
              <div className="centered d-flex flex-column justify-content-center align-items-center gap-3">
                <span className="fashion-sale text-center">Fashion Sale</span>
                <h1 className="minimal-style text-center">
                  Minimal Menz Style
                </h1>
                <p className="text-center">
                  Consectetur adipisicing elit. Laborum fuga incidunt
                  <br /> laboriosam voluptas iure, delectus dignissimos facilis
                  <br /> neque nulla earum.
                </p>
                <NavLink to='/products' className="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s" tabIndex={0} style={{animationDelay: '0.7s'}}>Shop Now</NavLink>

              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="swiper-img-2.jpg"
              alt="swiper-img-1"
              className="img-swiper"
            />
            <div className="container">
              <div className="centered-2 d-flex flex-column justify-content-center align-items-center gap-3">
                <span className="fashion-sale text-center">Fashion Sale</span>
                <h1 className="minimal-style text-center">
                  Minimal Menz Style
                </h1>
                <p className="text-center display">
                  Consectetur adipisicing elit. Laborum fuga incidunt
                  <br /> laboriosam voluptas iure, delectus dignissimos facilis
                  <br /> neque nulla earum.
                </p>
                <NavLink to='/products' className="btn_1 hero-btn" data-animation="fadeInUp" data-delay="0.7s" tabIndex={0} style={{animationDelay: '0.7s'}}>Shop Now</NavLink>

              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
