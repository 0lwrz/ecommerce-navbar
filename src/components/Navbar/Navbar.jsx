import React, { useContext } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../context/User";
import { Navigation } from "swiper/modules";
import Signup from "./../../Pages/Register/components/Signup";

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserName(null);
    navigate("/sign-in");
  };
  return (
    <>
      <nav className=" Navbar navbar navbar-expand-lg navbar-light sticky-top bg-light navbar-color">
        <div className="container">
          <a className="navbar-brand" href="#">
            <div className="logo">
              <img src="capital.shop.logo.jpg" alt="logo" />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <div className="d-flex">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link ">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link ">
                  Products
                </NavLink>
              </li>
              </div>
              {userName ? (
                <>
                  <div>
                  <div className="d-flex cart ">
                    <NavLink to='/cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus " viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
                    </NavLink>

                    <li className="nav-item dropdown profile navbar-hover">
                      <a
                        className="nav-link dropdown btn btn-outline-danger rounded-5"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person svg-hover"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li className="text-center">
                          <Link to='/profile'className="dropdown-item text-dark">
                            {userName}
                          </Link>
                        </li>
                        <li className="text-center">
                          <a className="dropdown-item text-dark" href="#">
                            Settings 
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider " />
                        </li>
                        <li className="d-flex ">
                          <button
                            type="button"
                            class="btn btn-light p-2 flex-fill bg-white border border-white text-danger"
                            onClick={logout}
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </li>
                  </div>
                  </div>

                </>
              ) : (
                <>
                
                <div className="d-flex gap-2">
                  <li className="nav-item  rounded">
                    <NavLink to="sign-in" className="nav-link ">
                      Sign-in
                    </NavLink>
                  </li>
                  <li className="nav-item sign-color rounded">
                    <NavLink to="sign-up" className="nav-link text-white sign-color-text">
                      Sign-up
                    </NavLink>
                  </li>
                  </div>
                </>
              )}
              
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
}
