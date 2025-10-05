import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import summaryApi from "../common/summaryApi";
import AddAddress from "../components/AddAddress";
import EditAddressDetail from "../components/EditAddressDetail";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addresses);
  const [openAddAddress, setopenAddAddress] = useState(false);
  const [openEditAddress, setopenEditAddress] = useState(false);
  const [editData, seteditData] = useState({});
  const { fetchUserAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...summaryApi.deleteAddress,
        data: {
          _id: id,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        if (fetchUserAddress) {
          fetchUserAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between">
        <h2 className="font-semibold ">Addresses</h2>
        <button
          onClick={() => setopenAddAddress(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full"
        >
          Add Address
        </button>
      </div>
      <div className="bg-white p-2 grid gap-4">
        {addressList?.map((address, index) => {
          return (
            <div
              key={index}
              className={`flex gap-3 border-2 rounded p-3 hover:bg-blue-50 ${
                !address.status && "hidden"
              }`}
            >
              <div className="w-full" id="address">
                <p>{address?.address_line}</p>
                <p>{address?.city}</p>
                <p>{address?.state}</p>
                <p>
                  {address?.country} - {address?.pincode}
                </p>
                <p>{address?.mobile}</p>
              </div>
              <div className="grid gap-10">
                <button
                  onClick={() => {
                    setopenEditAddress(true);
                    seteditData(address);
                  }}
                  className="bg-green-200 p-1 rounded hover:text-white hover:bg-green-600"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => handleDisableAddress(address?._id)}
                  className="bg-red-200 p-1 rounded hover:text-white hover:bg-red-600"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}

        <div
          onClick={() => setopenAddAddress(true)}
          className=" h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer rounded"
        >
          Add Address
        </div>
      </div>
      {openAddAddress && <AddAddress close={() => setopenAddAddress(false)} />}
      {openEditAddress && (
        <EditAddressDetail
          close={() => setopenEditAddress(false)}
          editData={editData}
        />
      )}
    </section>
  );
};

export default Address;
