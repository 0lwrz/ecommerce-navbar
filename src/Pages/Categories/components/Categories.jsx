import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Categories.css";
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay"
import { Link, NavLink } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader , setLoader] = useState(true);
  const [error , setError] = useState('');
  const getCategories = async () => {
    try{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`
    );
    setCategories(data.categories);
    setLoader(false);
    setError('');
  }
    catch(error)
    {
     setError('error to load data')
     setLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  if(loader){
    return <Loader/>
  }

  return (
    <>
      <div className="container py-5 ">
        <div className="cate">
          <h2 className="trend border-bottom">
            Our Categories
            </h2>
          <Swiper
            // install Swiper modules
            modules={[Navigation, A11y , Autoplay]}
            loop={true}
            spaceBetween={50}
            slidesPerView={8}
            autoplay={true }
            navigation
            breakpoints={{
              300: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              400: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              500: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 50,
              },
            }}
          >
            {categories.map((categorie) => (
              <SwiperSlide>
                
                  <div key={categorie._id}>
                    
                    

                    <Link to={`/categories/${categorie._id}`}>

                    <img
                      src={categorie.image.secure_url}
                      className="home-img"
                      
                    />
                    </Link>

                  </div>
                
              </SwiperSlide> 
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
