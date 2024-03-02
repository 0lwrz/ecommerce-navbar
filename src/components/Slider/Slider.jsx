import React from 'react'
import './Slider.css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Slider() {
  return (
    <>
    <div className="swiper">
    <Swiper
      modules={[Navigation,A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <img src='public/Pic/swiper-img-1.jpeg' className='img-swiper'/>
        <div className="container">
        <div class="centered d-flex flex-column justify-content-center align-items-center gap-3">
          <span className='fashion-sale text-center'>Fashion Sale</span>
          <h1 className='minimal-style text-center'>Minimal Menz Style</h1>
          <p className='text-center'>Consectetur adipisicing elit. Laborum fuga incidunt<br/> laboriosam voluptas iure, delectus dignissimos facilis<br/> neque nulla earum.</p>
        </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
      <img src='public/Pic/swiper-img-2.jpeg' className='img-swiper'/>
      <div className="container">
        <div class="centered-2 d-flex flex-column justify-content-center align-items-center gap-3">
          <span className='fashion-sale text-center'>Fashion Sale</span>
          <h1 className='minimal-style text-center'>Minimal Menz Style</h1>
          <p className='text-center'>Consectetur adipisicing elit. Laborum fuga incidunt<br/> laboriosam voluptas iure, delectus dignissimos facilis<br/> neque nulla earum.</p>
        </div>
        </div>
      </SwiperSlide>
    </Swiper>
    </div>
    </>
  )
}


