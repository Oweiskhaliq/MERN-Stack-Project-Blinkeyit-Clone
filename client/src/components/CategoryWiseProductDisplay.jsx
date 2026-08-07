import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import { ValidURLConverter } from "../Utils/ValidURLConverter";
import CardLoading from "./CardLoading";
import CardProudcts from "./CardProudcts";
const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const subCategoryData = useSelector((state) => state.products.allSubCategory);
  const navigate = useNavigate();
  // functio
  // fetched Category Wise Products
  const fetchCategoryWiseProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProducts();
  }, []);

  // scroll right
  const handleScrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };
  // scroll Left
  const handleScrollLeft = () => {
    scrollRef.current.scrollLeft += -200;
  };

  // handle redirect to product listing page

  const handleRedirectProductListingPage = () => {
    const Subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((cat) => {
        return cat._id == id;
      });
      return filterData ? true : null;
    });

    const url = `/${ValidURLConverter(name)}/${id}/${ValidURLConverter(
      Subcategory.name
    )}/${Subcategory._id}`;
    navigate(url);
  };
  const loadCardNumber = new Array(6).fill(0);
  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <div
          onClick={handleRedirectProductListingPage}
          className="font-semibold text-green-600 cursor-pointer hover:text-green-400"
        >
          See All
        </div>
      </div>
      <div className="relative flex items-center">
        <div
          className="flex   gap-4 md:gap-6 lg:gap-8 container mx-auto overflow-x-scroll  scrollbar-none px-4 overflow-hidden scroll-smooth "
          ref={scrollRef}
        >
          {/* display loading card // scleton card */}
          {loading &&
            loadCardNumber.map((_, index) => {
              return <CardLoading key={index} />;
            })}

          {/* display products */}
          {data.map((p, index) => {
            return <CardProudcts key={p._id + index} data={p} />;
          })}
        </div>
        <div className=" w-full lg:flex container px-2 mx-auto  absolute justify-between left-0 right-0 hidden ">
          <button
            onClick={handleScrollLeft}
            className="relative z-10 text-lg shadow-lg p-2 rounded-full  hover:bg-gray-100  bg-white"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="relative z-10 text-lg shadow-lg p-2 rounded-full  hover:bg-gray-100 bg-white"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
