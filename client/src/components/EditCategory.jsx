import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Axios from "../Utils/Axios";
import uploadImage from "../Utils/UploadImage";
import axiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";

const EditCategory = ({ fetchedCategory, close, data: categoryData }) => {
  const [data, setData] = useState({
    categoryId: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.updateCategory,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        close();
        fetchedCategory();
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file was Slected!");
      return;
    }
    try {
      setImageUploadLoading(true);
      const response = await uploadImage(file);
      const { data: imageRes } = response;

      setData((preve) => {
        return {
          ...preve,
          image: imageRes.data.url,
        };
      });
      toast.success(imageRes.message);
    } catch (error) {
      axiosToastError(error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-20 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full rounded">
        <div className="flex items-center justify-between p-4 rounded ">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <MdClose />
          </button>
        </div>
        {/* Form */}
        <form className="my-3 px-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name:</label>
            <input
              type="text"
              placeholder="Enter Category Name"
              id="categoryName"
              value={data.name}
              name="name"
              onChange={handleOnChnage}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    alt="Category"
                    src={data.image}
                    className="h-full w-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
            ${
              !data.name
                ? "bg-gray-400"
                : "border-primary-200 hover:bg-primary-200"
            }
            px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                  {imageUploadLoading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  type="file"
                  className="hidden"
                  id="uploadCategoryImage"
                  onChange={handleUploadCategoryImage}
                />
              </label>
            </div>
          </div>
          <button
            className={`
          ${
            data.name && data.image
              ? "bg-primary-200 hover:bg-primary-100"
              : "bg-slate-300"
          }
          py-3 font-semibold  
          `}
          >
            {loading ? "Uploading..." : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
