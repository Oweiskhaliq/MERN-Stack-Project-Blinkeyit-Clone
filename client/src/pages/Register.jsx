import React, { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axiox from "../Utils/Axios";
import summaryApi from "../common/summaryApi";
import axiosToastError from "../Utils/axiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confrimPassword: "",
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
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const navigate = useNavigate();

  const valideValue = Object.values(data).every((el) => el);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    //much password and confrim password
    if (data.password !== data.confrimPassword) {
      toast.error(" password and confrim password must be same.");
      return;
    }

    try {
      const response = await Axiox({
        ...summaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confrimPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <section className="min-h-[78vh] w-full container mx-auto px-2 ">
      <div className="bg-white  w-full my-2 mx-auto max-w-lg p-7 rounded-xl shadow-xl">
        <p className="font-semibold text-center">Wellcome To Blinkeyit.</p>

        <form className="grid gap-4 mt-4 shadow-lg" onSubmit={handlerSubmit}>
          <div className="grid gap-1 ">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              autoFocus
              className="bg-blue-50 p-2 border rounded-lg outline-none focus:border-primary-200"
              onChange={handlerChanger}
              placeholder="Enter your name."
            />
          </div>
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
          <div className="grid gap-1 ">
            <label htmlFor="confrimPassword">Confrim Password :</label>
            <div className="bg-blue-50 p-2 border rounded-lg flex items-center focus-within:border-primary-200">
              <input
                type={showConfrimPassword ? "text" : "password"}
                name="confrimPassword"
                id="confrimPassword"
                value={data.confrimPassword}
                className="w-full outline-none"
                onChange={handlerChanger}
                placeholder="Enter your confrim password."
              />
              <div
                onClick={() => setShowConfrimPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {!showConfrimPassword ? (
                  <IoMdEyeOff size={20} />
                ) : (
                  <IoEye size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-2 -tracking-wide`}
          >
            Register
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-gray-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
