import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axiox from "../Utils/Axios";
import summaryApi from "../common/summaryApi";
import axiosToastError from "../Utils/axiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handlerChanger = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const valideValue = Object.values(data).every((el) => el);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axiox({
        ...summaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        //save access and refresh token in local storage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <section className="min-h-[78vh] w-full container mx-auto px-2 ">
      <div className="bg-white  w-full my-6 mx-auto max-w-lg p-7 rounded-xl shadow-xl">
        <p className=" text-center text-green-800 font-extrabold">Login</p>

        <form className="grid gap-4 mt-4 shadow-lg" onSubmit={handlerSubmit}>
          <div className="grid gap-1 ">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              className="bg-blue-50 p-2 border rounded-lg outline-none focus:border-primary-200"
              onChange={handlerChanger}
              placeholder="Enter your email."
            />
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 p-2 border rounded-lg flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={data.password}
                className="w-full outline-none"
                onChange={handlerChanger}
                placeholder="Enter your password."
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {!showPassword ? <IoMdEyeOff size={20} /> : <IoEye size={20} />}
              </div>
            </div>
          </div>
          <Link
            to={"/forgot-password"}
            className="block ml-auto underline text-blue-800 hover:text-primary-200"
          >
            Forgot Password ?
          </Link>
          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-2 -tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Don't have account ?{" "}
          <Link
            to={"/Register"}
            className="font-semibold text-gray-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
