import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../Utils/Axios";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";
import AxiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";
import AddAddress from "../components/AddAddress";
import { useGlobalContext } from "../provider/GlobalProvider";
import {loadStripe} from "@stripe/stripe-js";
const CheckOutPage = () => {
  const {
    totalPrice,
    totalPriceWithOutDiscount,
    totalQuantity,
    fetchCartItems,
  } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addresses);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      
      const response = await Axios({
        ...summaryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemList,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        toast.success(responseData?.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading....")
      const response = await Axios({
        ...summaryApi.payment_url,
        data: {
          list_items: cartItemList,
          addressId: addressList[selectedAddress]?._id,
        },
      });
  
      if (response.data.success) {
        window.location.href = response.data.url; // ✅ FIX
        toast.success(response.data.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  
  
  return (
    <section className="bg-blue-50">
      
      <div className="container  mx-auto p-4 flex flex-col lg:flex-row gap-5 justify-between ">
        {/* select address section  */}
        <div className="w-full">
          <h3 className="text-lg font-semibold">Choose Your Address</h3>
          <div className="bg-white p-2 grid gap-4">
            {addressList?.map((address, index) => {
              return (
                <label htmlFor={"address" }key={"addr"+ index}>
                  <div
                    key={index}
                    className={`flex gap-3 border-2 rounded p-3 hover:bg-blue-50 ${
                      !address?.status && "hidden"
                    }`}
                  >
                    <div className="p-5 ">
                      <input
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        type="radio"
                        value={index}
                        name="address"
                        id={"address" + index}
                      />
                    </div>
                    <div id="address">
                      <p>{address?.address_line}</p>
                      <p>{address?.city}</p>
                      <p>{address?.state}</p>
                      <p>
                        {address?.country} - {address?.pincode}
                      </p>
                      <p>{address?.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}

            <div
              onClick={() => setOpenAddress(true)}
              className=" h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer rounded"
            >
              Add Address
            </div>
          </div>
        </div>

        {/* billing detail and payments section   */}
        <div className="w-full max-w-md bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">Summary</h3>
          {/* cart billing detials */}
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1 ">
              <p>Items Total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInPKR(totalPriceWithOutDiscount)}
                </span>
                <span>{DisplayPriceInPKR(totalPrice)}</span>
              </p>
            </div>

            <div className="flex gap-4 justify-between ml-1">
              <p>Quantity Total</p>
              <p className="flex items-center gap-2">{totalQuantity} items</p>
            </div>

            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charges</p>
              <p className="flex items-center gap-2">Free</p>
            </div>

            <div className=" font-semibold flex gap-4 justify-between ">
              <p>Grand Total</p>
              <p className="">{DisplayPriceInPKR(totalPrice)}</p>
            </div>
          </div>
          {/* buttons  */}
          <div className="w-full flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold" onClick={()=> handleOnlinePayment()}>
              Online Payment
            </button>
            <button
              className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 rounded hover:bg-green-600 hover:text-white"
              onClick={() => handleCashOnDelivery()}
            >
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />} 
    </section>
  );
};

export default CheckOutPage;
