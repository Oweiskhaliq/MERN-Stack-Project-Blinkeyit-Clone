import { useState } from "react";
import { MdClose, MdCloudUpload, MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import Axios from "../Utils/Axios";
import SuccessAlert from "../Utils/SuccessAlert";
import uploadImage from "../Utils/UploadImage";
import AxiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";
import AddMoreFieldComponent from "../components/AddMoreFieldComponent";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.products.allCategory);
  const allSubCategory = useSelector((state) => state.products.allSubCategory);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [openAddField, setOpenAddField] = useState(false);
  const [addFieldName, setAddFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // upload image
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: responseData } = response;
    const imageUrl = responseData.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  // remove image
  const handleDeleteImage = (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //remove selected category
  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //remove selected sub category
  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //add submited field
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [addFieldName]: "",
        },
      };
    });
    setAddFieldName("");
    setOpenAddField(false);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...summaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;
      console.log("responseData", responseData);
      if (responseData.success) {
        SuccessAlert(responseData.message);

        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between">
        <h2 className="font-semibold ">Upload Category</h2>
      </div>
      {/* upload product form */}
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product Name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>
          {/* description */}
          <div className="grid gap-1 ">
            <label className="font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Enter product description"
              value={data.description}
              onChange={handleChange}
              required
              multiple
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>
          {/* images */}
          <div>
            <p>Image</p>
            {/* upload image */}
            <div>
              <label
                htmlFor="productImage"
                className="font-medium bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
              >
                <div className="flex justify-center items-center flex-col">
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <MdCloudUpload size={35} />
                      <span>Upload Image</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleUploadImage}
                  hidden
                  accept="image/*"
                />
              </label>
            </div>
            {/* Display Image */}
            <div className=" flex gap-4">
              {data.image.map((img, index) => {
                return (
                  <div className="h-20 mt-1 w-20 min-w-20  bg-blue-50 border cursor-pointer relative group">
                    <img
                      src={img}
                      alt={img}
                      key={img + index + "productImage"}
                      className="w-full h-full object-scale-down"
                      onClick={() => setViewImageUrl(img)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded hidden text-white group-hover:block"
                    >
                      <MdDeleteForever />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* category  */}
          <div>
            <label className="font-medium" htmlFor="category">
              Category
            </label>
            <div>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((cat) => cat._id === value);
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectedCategory("");
                }}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
              >
                <option value={""}>Select Category</option>
                {allCategory.map((cat, index) => {
                  return (
                    <option key={cat._id + index} value={cat?._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              {/* display selected category */}
              <div className="flex flex-wrap gap-3">
                {data.category.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + index + "productCategory"}
                      className="flex items-center text-sm justify-center gap-2 bg-blue-50 mt-2"
                    >
                      <p>{cat.name}</p>
                      <span
                        className="hover:text-red-600 cursor-pointer gap-1"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <MdClose size={20} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* sub category */}
          <div>
            <label className="font-medium" htmlFor="subCategory">
              Sub Category
            </label>
            <div>
              <select
                name="subCategory"
                id="subCategory"
                value={selectedSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (cat) => cat._id === value
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setSelectedSubCategory("");
                }}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
              >
                <option value={""}>Select Sub Category</option>
                {allSubCategory.map((cat, index) => {
                  return (
                    <option key={cat._id} value={cat?._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              {/* display selected category */}
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + index + "productCategory"}
                      className="flex items-center text-sm justify-center gap-2 bg-blue-50 mt-2"
                    >
                      <p>{cat.name}</p>
                      <span
                        className="hover:text-red-600 cursor-pointer gap-1"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <MdClose size={20} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Unit */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="unit">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              id="unit"
              placeholder="Enter product unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>

          {/* Stock */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="stock">
              Number Of Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>

          {/* Price */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>

          {/* DisCount */}
          <div className="grid gap-1">
            <label className="font-medium" htmlFor="discount">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
            />
          </div>
          {/* add more field  */}
          {Object?.keys(data?.more_details)?.map((key, index) => {
            return (
              <div key={key + index + "newField"} className="grid gap-1">
                <label className="font-medium" htmlFor={key}>
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  value={data.more_details[key]}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((preve) => {
                      return {
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [key]: value,
                        },
                      };
                    });
                  }}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200  rounded w-full"
                />
              </div>
            );
          })}

          {/* add field button */}
          <div
            className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:border-neutral-900 cursor-pointer rounded"
            onClick={() => setOpenAddField(true)}
          >
            Add Fields
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="bg-primary-100 hover:bg-primary-200  py-2 rounded font-semibold "
          >
            Submit
          </button>
        </form>
      </div>
      {/* display full screen image */}
      {viewImageUrl && (
        <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
      )}
      {/* open add field model box */}
      {openAddField && (
        <AddMoreFieldComponent
          close={() => setOpenAddField(false)}
          value={addFieldName}
          onChange={(e) => setAddFieldName(e.target.value)}
          submit={handleAddField}
        />
      )}
    </section>
  );
};

export default UploadProduct;
