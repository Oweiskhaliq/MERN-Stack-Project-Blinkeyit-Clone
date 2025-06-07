import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";
import ConfirmBox from "../components/ConfirmBox";
import EditCategory from "../components/EditCategory";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openDeleteConfrimCategoryBox, setOpenDeleteConfrimCategoryBox] =
    useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    categoryId: "",
  });

  const fetchedCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchedCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchedCategory();
        setOpenDeleteConfrimCategoryBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between">
        <h2 className="font-semibold ">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>

      {/* if no data  */}
      {!categoryData[0] && !loading && <NoData />}

      {/* show category */}
      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div className="w-32 h-56  rounded shadow-md " key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="flex items-center h-9 gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenDeleteConfrimCategoryBox(true);
                    setDeleteCategory({ categoryId: category._id });
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* loading Spinner */}
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchedCategory={fetchedCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {/* open Edit category model */}
      {openEdit && (
        <EditCategory
          data={editData}
          fetchedCategory={fetchedCategory}
          close={() => setOpenEdit(false)}
        />
      )}
      {/* open delte confirm Box */}
      {openDeleteConfrimCategoryBox && (
        <ConfirmBox
          close={() => setOpenDeleteConfrimCategoryBox(false)}
          confrim={handleDeleteCategory}
          cancel={() => setOpenDeleteConfrimCategoryBox(false)}
        />
      )}
    </section>
  );
};

export default Category;
