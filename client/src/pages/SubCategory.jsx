import { useEffect, useState } from "react";

import { createColumnHelper } from "@tanstack/react-table";
import { FaEdit } from "react-icons/fa";

import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common/summaryApi";
import ConfirmBox from "../components/ConfirmBox";
import DisplayTable from "../components/DisplayTable";
import EditSubCategory from "../components/EditSubCategory";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import ViewImage from "../components/ViewImage";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";

const SubCategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);

  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deletesubCategoryData, setdeletesubCategoryData] = useState({
    _id: "",
  });
  const [deleteConfrimBox, setDeleteConfrimBox] = useState(false);

  const [category, setCategory] = useState([]);

  //fetch sub category data
  const fetchSubCategoryData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setSubCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategoryData();
  }, []);

  //table columns
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center cursor-pointer">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8"
              onClick={() => setImageUrl(row.original.image)}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((cat, index) => {
              return (
                <p
                  className="shadow-md py-1 px-1 inline-block"
                  key={cat._id + "table"}
                >
                  {cat.name}{" "}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-4">
            <button
              className="py-2  text-green-400 rounded-md  hover:text-green-600"
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="py-2  text-red-500 rounded-md  hover:text-red-600"
              onClick={() => {
                setDeleteConfrimBox(true);
                setdeletesubCategoryData(row.original);
              }}
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  // delete subCategory
  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteSubCategory,
        data: deletesubCategoryData,
      });
      const { data: responseData } = response;
      console.log(response);
      if (responseData.success) {
        toast.success(responseData.message);
        setDeleteConfrimBox(false);
        fetchSubCategoryData();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between">
        <h2 className="font-semibold ">Sub Category</h2>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>
      {/* show sub category data in a table */}
      <div className="overflow-auto max-w-[95vw]">
        <DisplayTable data={subCategoryData} columns={columns} />
      </div>
      {/* show upload subCategory model box */}
      {openUploadSubCategory && (
        <UploadSubCategoryModel
          fetchData={fetchSubCategoryData}
          close={() => setOpenUploadSubCategory(false)}
        />
      )}
      {/* disply full screen image */}
      {imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />}

      {/* open Edit Model */}
      {openEdit && (
        <EditSubCategory
          fetchData={fetchSubCategoryData}
          close={() => setOpenEdit(false)}
          data={editData}
        />
      )}

      {/* delete model box */}
      {deleteConfrimBox && (
        <ConfirmBox
          close={() => setDeleteConfrimBox(false)}
          cancel={() => setDeleteConfrimBox(false)}
          confrim={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
