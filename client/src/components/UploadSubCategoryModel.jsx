import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "../Utils/Axios";
import uploadImage from "../Utils/UploadImage";
import AxiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";

const UploadSubCategoryModel = ({ close, fetchData }) => {
  const [uploadSubCategoryData, setUploadSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  // get all category from redux store
  const allCategory = useSelector((state) => state.products.allCategory);

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUploadSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const response = await uploadImage(file);
    const { data: imageRes } = response;

    setUploadSubCategoryData((preve) => {
      return {
        ...preve,
        image: imageRes.data.url,
      };
    });
    setLoading(false);
  };

  // delete selected category
  const handleRemoveCategorySelected = (categoryId) => {
    const index = uploadSubCategoryData.category.findIndex(
      (el) => el?._id === categoryId
    );
    uploadSubCategoryData.category.splice(index, 1);
    setUploadSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  // submit from
  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryApi.createSubCategory,
        data: uploadSubCategoryData,
      });
      const { data: responseData } = response;

      if (responseData?.success) {
        toast.success(responseData?.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 z-50 bg-opacity-70 flex items-center justify-center p-4">
      <div className="w-full  max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add sub Category</h1>
          <button onClick={close}>
            <MdClose size={25} />
          </button>
        </div>
        {/* sub category  Form  */}
        <form className="py-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={uploadSubCategoryData.name}
              onChange={handleOnChange}
              name="name"
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200"
            />
          </div>
          {/* upload image section */}

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col gap-3 lg:flex-row items-center">
              <div className="lg:w-36 full h-36 bg-blue-50 flex items-center justify-center">
                {!uploadSubCategoryData.image ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <img
                    alt="Sub Category"
                    src={uploadSubCategoryData.image}
                    className="h-full w-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubcategoryImage">
                <div
                  className={
                    !uploadSubCategoryData.name
                      ? "bg-gray-400 p-2 cursor-not-allowed"
                      : "px-3 py-1 border border-primary-100  text-primary-200 hover:bg-primary-200 hover:text-neutral-800 rounded"
                  }
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  disabled={!uploadSubCategoryData.name}
                  type="file"
                  id="uploadSubcategoryImage"
                  name="image"
                  onChange={handleUploadSubCategoryImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* select category amd add sub category */}
          <div className="grid gap-1">
            <label>Sub Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/* display value */}
              <div className="flex flex-wrap gap-2 px-1 m-1">
                {uploadSubCategoryData.category.map((cat, index) => {
                  return (
                    <div
                      className="bg-white shadow-md flex items-center gap-2"
                      key={cat._id + "slectedValue"}
                    >
                      {cat.name}
                      <span
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <MdClose />
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* select category  */}
              <select
                className="w-full p-2 bg-transparent outline-none  border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el?._id === value
                  );
                  setUploadSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option disabled value={""}>
                  Select Category
                </option>
                {allCategory.map((category) => (
                  <option
                    key={category?._id + "subCategory"}
                    value={category?._id}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* submit button */}
          <button
            className={`px-3 py-2 font-semibold  border border-purple-200 
           ${
             uploadSubCategoryData?.name &&
             uploadSubCategoryData?.image &&
             uploadSubCategoryData?.category[0]
               ? "bg-primary-200 hover:bg-primary-100 text-neutral-800"
               : " hover:bg-gray-200 hover:hover:bg-gray-100 cursor-not-allowed text-primary-200"
           } hover:bg-primary-100
            `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
