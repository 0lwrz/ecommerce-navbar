import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./ProductsDetails.css";
import { UserContext } from "../../context/User";
import { Flip, Bounce } from "react-toastify";
import { toast } from "react-toastify";
export default function ProductsDetails() {
  const { id } = useParams("id");
  const { userName } = useContext(UserContext);
  const [loader, setLoader] = useState(true);
  const [productsDetails, setProductsDetails] = useState({});
  const getProductsDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      setProductsDetails(data.product);
      setImages(data.product);
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      setLoader(true);
      const token = localStorage.getItem("userToken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setLoader(false);
      if (data.message == "success") {
        toast.success("The product has been added to the cart", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/products");
      }
    } catch (err) {
      if (err.response.status === 409) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    getProductsDetails();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="row">
                <div className="col-md-6">
                  <div className="images p-3">
                    <div className="text-center p-4" key={productsDetails._id}>
                      <img
                        id="main-image"
                        src={productsDetails.mainImage.secure_url}
                        width={250}
                      />
                    </div>
                    <div className="thumbnail text-center d-flex gap-1 justify-content-center">
                      {productsDetails.subImages.map((product) => (
                        <div key={product._id}>
                          <img src={product.secure_url} width={70} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <i className="fa fa-long-arrow-left" />
                        <Link
                          to="/products"
                          className="ml-1 btn btn-danger text-uppercase mr-2 px-4"
                        >
                          Back
                        </Link>
                      </div>
                      <i className="fa fa-shopping-cart text-muted" />
                    </div>
                    <div className="mt-4 mb-3" key={productsDetails._id}>
                      <h5 className="text-uppercase">{productsDetails.name}</h5>
                      <div className="price d-flex flex-row align-items-center">
                        <span className="act-price">
                          ${productsDetails.price}
                        </span>
                      </div>
                    </div>
                    <p className="about">{productsDetails.description}</p>
                    {userName ? (
                      <div className="cart mt-4 align-items-center">
                        <button
                          onClick={() => addToCart(productsDetails._id)}
                          className="btn btn-danger text-uppercase mr-2 px-4"
                        >
                          Add to cart
                        </button>
                        <i className="fa fa-heart text-muted" />
                        <i className="fa fa-share-alt text-muted" />
                      </div>
                    ) : (
                      <div className="cart mt-4 align-items-center">
                        <Link
                          to="/sign-in"
                          className="btn btn-danger text-uppercase mr-2 px-4"
                        >
                          Please log-in to keep shopping
                        </Link>
                        <i className="fa fa-heart text-muted" />
                        <i className="fa fa-share-alt text-muted" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
