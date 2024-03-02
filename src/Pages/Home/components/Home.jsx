import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(
      "https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10"
    );
    setCategories(data.categories);
  };
  useEffect(() => {
    getCategories();
  }, []);

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

          <img src={categorie.image.secure_url} className="home-img"/>
           <div>
            <h2 className="home-h2">{categorie.name}</h2>
           </div>

        </SwiperSlide>
        )}
  
 
    </Swiper>
    </div>
      </div>
    </>
  );
}
