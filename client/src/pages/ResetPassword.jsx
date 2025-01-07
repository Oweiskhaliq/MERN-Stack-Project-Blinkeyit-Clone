import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";
import Axiox from "../Utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const valideValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return { ...prev, email: location?.state?.email };
      });
    }
  }, []);

  const handlerChanger = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same");
    }
    try {
      const response = await Axiox({
        ...summaryApi.reset_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/login");

        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <section className="min-h-[78vh] w-full container mx-auto px-2 ">
      <div className="bg-white  w-full my-6 mx-auto max-w-lg p-7 rounded-xl shadow-xl">
        <p className=" text-center text-green-800 font-extrabold">
          Reset Password
        </p>

        <form className="grid gap-4 mt-4 shadow-lg" onSubmit={handlerSubmit}>
          <div className="grid gap-1 ">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 p-2 border rounded-lg flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={data.password}
                className="w-full outline-none"
                onChange={handlerChanger}
                placeholder="Enter your new password."
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
            <label htmlFor="confirmPassword">Confirm Password :</label>
            <div className="bg-blue-50 p-2 border rounded-lg flex items-center focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={data.password}
                className="w-full outline-none"
                onChange={handlerChanger}
                placeholder="Enter your Confirm password."
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {!showConfirmPassword ? (
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
            Change Password
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

export default ResetPassword;
