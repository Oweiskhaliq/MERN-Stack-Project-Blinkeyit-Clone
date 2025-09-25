import { useState } from "react";
import AddAddress from "../components/AddAddress";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";

const CheckOutPage = () => {
  const { totalPrice, totalPriceWithOutDiscount, totalQuantity } =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  return (
    <section className="bg-blue-50">
      <div className="container  mx-auto p-4 flex flex-col lg:flex-row gap-5 justify-between ">
        {/* select address section  */}
        <div className="w-full">
          <h3 className="text-lg font-semibold">Choose Your Address</h3>
          <div
            onClick={() => setOpenAddress(true)}
            className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
          >
            Add Address
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
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold">
              Online Payment
            </button>
            <button className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 rounded hover:bg-green-600 hover:text-white">
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
