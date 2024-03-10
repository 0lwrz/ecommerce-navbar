import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Products() {
  const [products , setProducts] = useState([]);
  const {id} = useParams();
  const getProducts =async () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const {data} = await axios.get(`https://ecommerce-node4.vercel.app/products/category/${id}`);
    setProducts(data.products);
  };
  useEffect(()=>{
   getProducts();
  },[]);
  return (
    <>
    {products.map(product =>
      <div key={product._id}>
        <h2>{product.name}</h2>
        <p>{product.slug}</p>
        <p>{product.description}</p>
        <p>{product.stock}</p>
        <p>{product.price}</p>
        <p>{product.discount}</p>
        <p>{product.finalPrice}</p>
        <img src={product.mainImage.secure_url}/>
      </div>
      )}
    </>
  )
}
