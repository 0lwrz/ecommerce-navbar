import React from 'react'
import './Hero.css'
import { NavLink } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function Hero() {
  return (
    <>
    <section className='hero'>
      <div className="container">
        <div className="row">
    <div className='text d-flex justify-content-center gap-2 col'>
     <p >Sale Up To 50% Biggest Discounts. Hurry! Limited Perriod Offer</p>
     <span>
      <NavLink className='shop'>Shop Now</NavLink>
     </span>
    </div>
    </div>
    </div>
    </section>
    
    </>
  )
}
