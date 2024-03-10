import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Categories.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NavLink } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`
    );
    setCategories(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, [])
  return (
    
      <>
      <div className="container p-5">
        <div className="cate">
        <h2 className="trend border-bottom">Trending This Week</h2>
        <Swiper
      // install Swiper modules
      modules={[Navigation,  A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {categories.map(categorie =>
        <SwiperSlide>
          <NavLink to={`/products/category/${categorie.id}`}>
          <div key={categorie.id}>
          <img src={categorie.image.secure_url} className="home-img"/>
           <div>
            <h2 className="home-h2">{categorie.name}</h2>
           </div>
           </div>
           </NavLink>

        </SwiperSlide>
        )}
  
 
    </Swiper>
    </div>
      </div>
      </>
  )
}
