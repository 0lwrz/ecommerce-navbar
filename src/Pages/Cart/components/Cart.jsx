import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("userToken");
  const getCart = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setProducts(data.products);

    console.log(data);
  };
  useEffect(() => {
    getCart();
  }, []);
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
                {products.map(product=>
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
                  <input
                    type="text"
                    className="form-control text-center"
                    defaultValue={2}
                  />
                </td>
                <td className="text-right font-weight-semibold align-middle p-4">
                  $115.1
                </td>
                <td className="text-center align-middle px-0">
                  <a
                    href="#"
                    className="shop-tooltip close float-none text-danger"
                    title
                    data-original-title="Remove"
                  >
                    ×
                  </a>
                </td>
              </tr>
                )
                  
                }
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
            >
              Back to shopping
            </button>
            <button type="button" className="btn btn-lg btn-primary mt-2">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
