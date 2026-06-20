import React from "react";
import GithubLogin from "../components/GithubLogin";
// import {  FaStar} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  return (
    <>
      <div className="dev bg-white d-flex justify-content-center align-content-center">
        <div className="container-1 m-auto mt-5 w-75 rounded-4">
          <h3 className="text-center main-color fw-bold mt-5 mb-5" > PortfolioGenie</h3>
          <h1 className="text-center my-3">Welcome Back</h1>
          <h2 className="text-center my-3">Login to continue building your portfolio</h2>
          <GithubLogin />
          <div className="d-flex align-items-center my-3 w-75 mx-auto my-5 ">
            <div className="flex-grow-1 border-top"></div>
            <span className="mx-3 text-muted ">Or Continue with email</span>
            <div className="flex-grow-1 border-top"></div>
          </div>
          <form className="w-75 mx-auto">

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="exampleInputPassword1" placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input " id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" className="btn_1 text-white button_main_color w-100 py-3 ">Login</button>
          </form>
          <div className="login-navigate d-flex justify-content-center my-5">
            <h4 color="mt-2">Don't have an account?</h4>
            <button className="main-color border-0 fw-bold ps-2" onClick={() => navigate('/register')}>Sign up for free</button>
          </div>
        </div>
      </div>

    </>
  );
}