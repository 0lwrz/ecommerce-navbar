import React, { useState } from "react";
import "./SignIn.css";
import { NavLink } from "react-router-dom";
import { object, string } from 'yup';
export default function SignIn() {
  
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="login-form-area">
              <div className="login-form">
                <div className="login-heading">
                  <span>Login</span>
                  <p>Enter Login details to get access</p>
                </div>
                <form>
                <div className="input-box">
                  <div className="single-input-fields">
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username"/>
                  </div>
                  <div className="single-input-fields">
                    <label>Password</label>
                    <input type="text" placeholder="Enter Password"/>
                  </div>
                    <div class="single-input-fields login-check">
                    <a href="#" class="f-right">Forgot Password?</a>
                  </div>
                </div>
                <div className="login-footer">
                <p>Don’t have an account? <NavLink to="/sign-up">Sign Up</NavLink> here</p>
                <button class="submit-btn3">Login</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
