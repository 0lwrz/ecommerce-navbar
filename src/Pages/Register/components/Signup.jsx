import React, { useState } from "react";
import "./Signup.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [errors, setErrors] = useState([]);
  const [loader , setLoader] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelImageChange = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const userSchema = object({
      userName: string().min(5).max(15).required(),
      email: string().required(),
      password: string().min(7).max(20).required(),
      image: string().required(),
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
    if (await validateData()) {
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("image", user.image);
      try{
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signup`,
          formData
        );
        setUser({
          userName: "",
          email: "",
          password: "",
          image: "",
        });
        if (data.message == 'success'){
          toast.success('success', {
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
            navigate('/');
        }
      } catch(error){
        if(error.response.status === 409){
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
       
      }finally{
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
                  <span>Sign Up</span>
                  <p>Create your account to get full access</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-box col">
                    <div className="single-input-fields">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={user.userName}
                        name="userName"
                        onChange={handelChange}
                      />
                      <div className="error">{errors.userName}</div>
                    </div>
                    <div className="single-input-fields">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
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
                        placeholder="Enter Password"
                        value={user.password}
                        name="password"
                        onChange={handelChange}
                      />
                      <div className="error">{errors.password}</div>
                    </div>
                    <div className="single-input-fields">
                      <label>Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handelImageChange}
                      />
                      <div className="error">{errors.image}</div>
                    </div>
                  </div>
                  <div className="register-footer col">
                    <p>
                      Already have an account?
                      <NavLink to="/sign-in"> Login</NavLink> here
                    </p>
                    <button className="submit-btn3" type="submit" disabled={loader?'disabled':null}>
                      {!loader?'Sign up': '...wait'}
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
