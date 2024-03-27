import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Slider from "../../../components/Slider/Slider";
import Hero from "../../../components/Hero/Hero";
import Categories from "../../Categories/components/Categories";
import ProductsHome from "../../../components/ProdcutsHome/ProductsHome";



export default function Home() {
  return (
    <>
     <Hero/>
     <Slider/>
     <Categories/>
     <ProductsHome />
    </>
  );
}
