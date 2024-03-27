import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import Loader from "../../../components/Loader/Loader";
import {  NavLink } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=1&limit=10`
      );
      setProducts(data.products);
      setLoader(false);
      setError("");
    } catch (error) {
      setError("error to load data");
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [currenutPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currenutPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / recordsPerPage);
  const numbres = [...Array(npage + 1).keys()].slice(1);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <section style={{ backgroundColor: "#fff" }}>
        <div className="text-center container py-5 ">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>
          <div className="row">
            {records.map((e) => (
              <div className="col-lg-4 col-md-12 mb-4" key={e._id}>
                <div className="card">
                  <div
                    className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={e.mainImage.secure_url}
                      className="products-img "
                    />
                    <div>
                      <div className="mask">
                        <div className="d-flex justify-content-start align-items-end h-100">
                          <h5>
                            <NavLink
                              to ={`/products/${e._id}`}
                              className="badge bg-danger ms-2"
                            >
                              Details
                            </NavLink>
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
                    </div>
                  </div>
                  <div className="card-body">
                    <a href ='#' className="text-reset">
                      <h5 className="card-title mb-3">{e.name}</h5>
                    </a>
                    <a href ='#' className="text-reset">
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
          <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-center">
              <li className="page-item">
                <a
                  className="page-link text-danger"
                  href="#"
                  aria-label="Previous"
                  onClick={prePage}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {numbres.map((n, i) => (
                <li
                  className={`page-item${currenutPage === n ? "active " : ""}`}
                  key={i}
                >
                  <a
                    className="page-link text-danger"
                    href="#"
                    onClick={() => ChangeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a
                  className="page-link text-danger"
                  href="#"
                  aria-label="Next"
                  onClick={nextPage}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
  function ChangeCPage(id) {
    setCurrentPage(id);
  }
  function prePage() {
    if (currenutPage !== 1) {
      setCurrentPage(currenutPage - 1);
    }
  }
  function nextPage() {
    if (currenutPage !== npage) {
      setCurrentPage(currenutPage + 1);
    }
  }
}
