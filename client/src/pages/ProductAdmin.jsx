import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import summaryApi from "../common/summaryApi";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import ProductCardAdmin from "../components/ProductCardAdmin";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalPageCount, settotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  // fetched product
  const fetchedProduct = async () => {
    try {
      setloading(true);
      const response = await Axios({
        ...summaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setProductData(responseData.data);
        settotalPageCount(responseData.NoOfPages);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  //handle prev
  useEffect(() => {
    fetchedProduct();
  }, [page]);

  //handle next button
  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  //handle Previous button
  const handlPrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  //handleOnChangeSearch
  const handleOnChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    const flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchedProduct();
        flag = false;
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [search]);

  return (
    <section>
      <div className="bg-white p-2 shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold ">Products</h2>
        <div className="h-full min-w-24 bg-blue-50 px-4 flex items-center border  rounded focus-within:border-primary-200 gap-3 py-2 ">
          <IoIosSearch size={25} />
          <input
            type="text"
            placeholder="Search Product hear..."
            value={search}
            onChange={handleOnChangeSearch}
            className="h-full   outline-none bg-transparent "
          />
        </div>
      </div>
      {/* Loading */}
      {loading && <Loading />}
      {/* if no products */}
      {!productData[0] && !loading && <NoData />}
      {/* display products data */}
      <div className="p-4  bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return (
                <ProductCardAdmin key={p._id + index + "product"} data={p} />
              );
            })}
          </div>
        </div>
      </div>
      {/* pagination section */}
      <div className="flex justify-between my-4">
        <button
          className="border px-4 py-1 border-primary-200 hover:bg-primary-200"
          onClick={handlPrevious}
        >
          Previous
        </button>
        <button className="w-full bg-slate-100">
          {page}/{totalPageCount}
        </button>
        <button
          className="border px-4 py-1 border-primary-200 hover:bg-primary-200"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductAdmin;
