import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "./ProductsHome.css";
import { Link } from "react-router-dom";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import Loader from "../Loader/Loader";


export default function ProductsHome() {
  const [products, setProducts] = useState([]);
  const [loader , setLoader ] = useState(true);

  const getProducts = async () => {
    try{
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?page=1&limit=6`
    );
    setProducts(data.products);
    setLoader(false);
    }catch(err){
        setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loader){
    return <Loader/>
  }
  return (
    <>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="container py-5">
          <h4 className="text-start mb-5 trend border-bottom ">
            Trending this week
          </h4>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-4 col-md-12 mb-4" key={e._id}>
                <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                  <img
                    src={e.mainImage.secure_url}
                    className="w-100"
                    height={400}
                  />
                  <a href="#!">
                    <div className="mask bg-light-subtle">
                      <div className="d-flex justify-content-start align-items-start h-100">
                        <h5>
                          <span className="badge bg-light pt-2 ms-3 mt-3 text-dark">
                            ${e.price}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="hover-overlay">
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
          <Link
            to="/products"
            className="btn_1 hero-btn rounded"
            data-animation="fadeInUp"
            data-delay="0.7s"
            tabIndex={0}
            style={{ animationDelay: "0.7s" }}
          >
            Shop Now
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
