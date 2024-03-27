import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from './../Products/components/Products';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function CategoryProducts() {
    const {id} = useParams('id');
    const [products , setProducts] = useState([]);
    const [loader , setLoader] = useState(true);
    const getProducts = async () =>{
      try{
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products/category/${id}`
          );
          setProducts(data.products);
          setLoader(false);
        }catch(err){
          setLoader(false);
        }
    };
    useEffect(()=>{
        getProducts();
    },[])
    
    if(loader){
      return <Loader/>
    }

  return (
    <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>
          <div className="row">
            {products.map((e) => (
              <div className="col-lg-4 col-md-12 mb-4" key={e._id}>
                <div className="card">
                  <div
                    className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={e.mainImage.secure_url}
                      className="products-img"
                    />
                    <Link to ={`/products/${e._id}`}>
                      <div className="mask">
                        <div className="d-flex justify-content-start align-items-end h-100">
                          <h5>
                            <span className="badge bg-danger ms-2">
                              Details
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="hover-overlay">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="card-body">
                    <a href="#" className="text-reset">
                      <h5 className="card-title mb-3">{e.name}</h5>
                    </a>
                    <a href="#" className="text-reset">
                      <p>Discount: {e.discount}</p>
                    </a>
                    <h6 className="mb-3">
                      <strong className="ms-2 text-danger">${e.price}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
