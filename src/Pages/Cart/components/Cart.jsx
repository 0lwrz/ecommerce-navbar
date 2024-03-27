import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import Loader from "../../../components/Loader/Loader";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [actions , setAction] = useState(-1);
  const token = localStorage.getItem("userToken");
  const getCart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setProducts(data.products);
      setLoader(flase);
    } catch (err) {
      setLoader(false);
    }
  };
  const incraseQuantity = async (productId) => {
 
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setAction(actions+1);
  };
  const decraseQuantity = async (productId) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setAction(actions - 1);
  };
  const removeItem = async (productId) => {

    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/removeItem`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setAction(data.products);
  };
  const clearAll = async ()  =>{
    const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{}, {
      headers:{
        Authorization: `Tariq__${token}`,
      }
    });
    setAction(data.products);
    console.log(data);
  }
  useEffect(() => {
    getCart();
  }, [actions]);
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container px-3 my-5 clearfix">
      <div className="card">
        <div className="card-header">
          <h2>Shopping Cart</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered m-0">
              <thead>
                <tr>
                  <th
                    className="text-center py-3 px-4"
                    style={{ minWidth: 400 }}
                  >
                    Product Name &amp; Details
                  </th>
                  <th className="text-right py-3 px-4" style={{ width: 100 }}>
                    Price
                  </th>
                  <th className="text-center py-3 px-4" style={{ width: 120 }}>
                    Quantity
                  </th>
                  <th className="text-right py-3 px-4" style={{ width: 100 }}>
                    Total
                  </th>
                  <th
                    className="text-center align-middle py-3 px-0"
                    style={{ width: 40 }}
                  >
                    <a
                      href="#"
                      className="shop-tooltip float-none text-light"
                      title
                      data-original-title="Clear cart"
                    >
                      <i className="ino ion-md-trash" />
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td className="p-4">
                      <div className="media align-items-center">
                        <img
                          src={product.details.mainImage.secure_url}
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt
                        />
                        <div className="media-body">
                          <a href="#" className="d-block text-dark">
                            {product.details.name}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      ${product.details.price}
                    </td>
                    <td className="align-middle p-4">
                      <div className="quantity">
                        <button
                          onClick={() => decraseQuantity(product.details._id)}
                          className="minus bg-danger"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <div className="input-box-quantity">
                          {product.quantity}
                          </div>
                        <button
                          onClick={() => incraseQuantity(product.details._id)}
                          className="plus bg-danger"
                          aria-label="Increase"
                        > 
                        + 
                        </button>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      {product.details.price * product.quantity}
                    </td>
                    <td className="text-center align-middle px-0">
                      <button
                        href="#"
                        className="plus bg-danger p-2 text-white border border-white"
                        title
                        data-original-title="Remove"
                        onClick={() => removeItem(product.details._id)}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
            <div className="mt-4">
              <label className="text-muted font-weight-normal">Promocode</label>
              <input type="text" placeholder="ABC" className="form-control" />
            </div>
            <div className="d-flex">
              <div className="text-right mt-4"></div>
            </div>
          </div>
          <div className="float-right text-end">
            <button
              type="button"
              className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              onClick={()=> clearAll()}
            >
              Clear All
            </button>
            <button type="button" className="btn btn-lg btn-danger mt-2">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
