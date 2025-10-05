import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import summaryApi from "../common/summaryApi";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();

  const { fetchUserAddress } = useGlobalContext();

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...summaryApi.createAddress,
        data: {
          ...data,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
          reset();
          fetchUserAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 bg-opacity-75 h-screen overflow-scroll">
      <div className="bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded ">
        <h2 className="font-semibold ">Add Address </h2>
        <button onClick={close} className="w-fit block ml-auto">
          <MdClose />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-4">
          <div className="grid gap-1">
            <label htmlFor="address">Address Line:</label>
            <input
              {...register("address_line", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="address"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="city">City:</label>
            <input
              {...register("city", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="city"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="state">State:</label>
            <input
              {...register("state", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="state"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="pincode">PinCode:</label>
            <input
              {...register("pincode", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="pincode"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="country">Country:</label>
            <input
              {...register("country", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="country"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile No:</label>
            <input
              {...register("mobile", { required: true })}
              className="border bg-blue-50 rounded  focus-within:outline-primary-200"
              type="text"
              id="mobile"
            />
          </div>

          <button
            type="submit"
            className="bg-primary-200 w-full font-semibold py-2 mt-4 rounded hover:bg-primary-100"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
