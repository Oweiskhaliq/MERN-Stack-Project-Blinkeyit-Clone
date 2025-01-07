import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axiox from "../Utils/Axios";
import summaryApi from "../common/summaryApi";
import axiosToastError from "../Utils/axiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ForgotPasswordOtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  //got to next input
  const inputRef = useRef([]);

  // geting email from
  const location = useLocation();

  //checking if the user direct come to otp verification
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);
  const navigate = useNavigate();

  const valideValue = data.every((el) => el);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axiox({
        ...summaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location.state.email,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);

        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location.state.email,
          },
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
          OTP Verification.
        </p>

        <form className="grid gap-4 mt-4 shadow-lg" onSubmit={handlerSubmit}>
          <div className="grid gap-1 ">
            <label htmlFor="otp">Enter your OTP :</label>
            <div className="flex items-center gap-2 justify-between">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newValue = [...data];
                      newValue[index] = value;
                      setData(newValue);

                      // got next input
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded-lg outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }  text-white py-2 rounded font-semibold my-2 -tracking-wide`}
          >
            Verify OTP
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

export default ForgotPasswordOtpVerification;
