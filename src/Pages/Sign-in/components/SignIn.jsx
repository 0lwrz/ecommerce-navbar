import React, { useState } from "react";
import "./SignIn.css";
import { NavLink , useNavigate} from "react-router-dom";
import { object, string } from 'yup';
import { toast } from "react-toastify";
import { Flip } from "react-toastify";
import axios from "axios";
export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
  const validateData = async () => {
    const userSchema = object({
      email: string().required(),
      password: string().min(7).max(20).required(),
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
    if (await validateData()) {;
      try{
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/signin`,
          {
            email:user.email,
            password:user.password,
          },
        );
        setUser({
          email: "",
          password: "",
        });
        localStorage.setItem('userToken',data.token)
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
            <div className="login-form-area">
              <div className="login-form">
                <div className="login-heading">
                  <span>Login</span>
                  <p>Enter Login details to get access</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <div className="single-input-fields">
                    <label>Email</label>
                    <div className="error">
                      {errors.email}
                    </div>
                    <input type="email" placeholder="Enter your email" name="email" value={user.email} onChange={handelChange}/>
                  </div>
                  <div className="single-input-fields">
                    <label>Password</label>
                    <div className="error">
                      {errors.password}
                    </div>
                    <input type="password" placeholder="Enter Password" name="password" value={user.password} onChange={handelChange}/>
                  </div>
                    <div className="single-input-fields login-check">
                    <a href="#" className="f-right">Forgot Password?</a>
                  </div>
                </div>
                <div className="login-footer">
                <p>Don’t have an account? <NavLink to="/sign-up">Sign Up</NavLink> here</p>
                <button className="submit-btn3" disabled={loader?'disabled':null}>
                  {!loader?'Login':'...wait'}
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
