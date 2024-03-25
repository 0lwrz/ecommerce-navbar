import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    code:"",
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
      password: string().min(7).max(20).required(),
      code:string().required(),

    });
    try {
      await userSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      // console.log("validation error",error.errors);
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
    if (await validateData()) {;
      try {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
          {
            email:user.email,
            password:user.password,
            code:user.code,
          }
        );
        setUser({
 
          email: "",
          password: "",
          code:"",

        });
        if (data.message == "success") {
          toast.success("Your password has changed", {
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
          navigate("/sign-in");
        }
      } catch (error) {
        if (error.response.status === 409) {
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
        }
        else if (error.response.status === 400){
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
        }
        else{
            navigate('*');
        }
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
            <div className="register-form-area col">
              <div className="register-form text-center col">
                <div className="register-heading col">
                  <p>Please enter the code to verify it and change the password</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-box col">
                    <div className="single-input-fields">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={user.email}
                        name="email"
                        onChange={handelChange}
                      />
                      <div className="error">{errors.email}</div>
                    </div>
                    <div className="single-input-fields">
                      <label>Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={user.password}
                        name="password"
                        onChange={handelChange}
                      />
                      <div className="error">{errors.password}</div>
                    </div>
                    <div className="single-input-fields">
                      <label>Code</label>
                      <input
                        type="text"
                        placeholder="Enter the code"
                        name="code"
                        onChange={handelChange}
                      />
                      <div className="error">{errors.code}</div>
                    </div>
                  </div>
                  <div className="register-footer col">
                    
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
