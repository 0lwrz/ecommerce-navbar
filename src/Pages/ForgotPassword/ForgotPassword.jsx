import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
import { Bounce } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });
  const [errors, setErrors] = useState([]);
  const [loader, setLoader] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const validateData = async () => {
    const userSchema = object({
      email: string().required(),
    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
        setErrors(validationErrors);
      });
      setLoader(false);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (await validateData()) {
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/sendcode`,
          {
            email: user.email,
          }
        );
        setUser({
          email: "",
        });

        if (data.message == "success") {
          toast.info("Please check your email to get the code", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          navigate("/sendcode");
        }
      } catch (error) {
        toast.error(error.response.data.message, {
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
      } finally {
        setLoader(false);
      }
    }
  };
  return (
    <>
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <section>
        <div className="container">
          <div className="row">
            <div className="login-form-area">
              <div className="login-form">
                <div className="login-heading">
                  <div className="login-heading">
                    <span>Forget Password</span>
                    <p>
                      Please, enter your email so you can retrieve your password
                    </p>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-box">
                    <div className="single-input-fields">
                      <label>Email</label>
                      <div className="error">{errors.email}</div>
                      <input
                        type="email"
                        value={user.email}
                        placeholder="Enter your email"
                        name="email"
                        onChange={handelChange}
                      />
                    </div>
                  </div>
                  <div className="login-footer">
                  <button
                      className="submit-btn3"
                      type="submit"
                      disabled={loader ? "disabled" : null}
                    >
                      {!loader ? (
                        "Submit"
                      ) : (
                        <div className="spinner-border" role="status">
                          <span className="sr-only"></span>
                        </div>
                      )}
                    </button>
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
