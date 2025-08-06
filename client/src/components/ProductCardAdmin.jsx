import { useState } from "react";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import ConfirmBox from "../components/ConfirmBox";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import EditProductAdmin from "./EditProductAdmin";
const ProductCardAdmin = ({ data, fetchedProduct }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // delete Products
  const handleDeleteProduct = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setOpenDelete(false);
        fetchedProduct();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-36 grid p-4  bg-white rounded shadow-sm border">
      <img
        src={data?.image[0]}
        alt={data?.name}
        className="w-full h-full object-scale-down"
      />
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-500">{data?.unit}</p>
      <div className="grid grid-cols-2 gap-3 py-2">
        <button
          onClick={() => setEditOpen(true)}
          className=" broder px-1 py-1 rounded text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className=" broder px-1 py-1 rounded text-sm border-red-600 bg-red-200 text-red-600 hover:bg-red-200"
        >
          Delete
        </button>
      </div>
      {editOpen && (
        <EditProductAdmin
          productData={data}
          close={() => setEditOpen(false)}
          fetchedProduct={fetchedProduct}
        />
      )}
      {openDelete && (
        <ConfirmBox
          confrim={handleDeleteProduct}
          close={() => setOpenDelete(false)}
          cancel={() => setOpenDelete(false)}
        />
      )}
    </div>
  );
};

export default ProductCardAdmin;
