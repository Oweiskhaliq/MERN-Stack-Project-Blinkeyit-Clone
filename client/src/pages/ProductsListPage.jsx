import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import summaryApi from "../common/summaryApi";
import CardProudcts from "../components/CardProudcts";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import { ValidURLConverter } from "../Utils/ValidURLConverter";

const ProductsListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const AllSubCategory = useSelector((state) => state.products.allSubCategory);
  const [displaySubCategory, setDisplatSubCategory] = useState([]);

  const params = useParams();

  const { category, id, subCategory, subId } = params;

  const fetchedProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: [id],
          subCategoryId: [subId],
          page: page,
          limit: 10,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedProductData();
  }, [params]);

  useEffect(() => {
    const subCat = AllSubCategory.filter((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? filterData : null;
    });
    setDisplatSubCategory(subCat);
  }, [params, AllSubCategory]);
  return (
    <section className="sticky top-24 lg:top-20 grid-cols-2">
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* sidebar sub category */}

        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarcustom">
          {displaySubCategory.map((subCat, index) => {
            const link = `/${ValidURLConverter(subCat?.category[0]?.name)}/${
              subCat?.category[0]?._id
            }/${ValidURLConverter(subCat.name)}/${subCat._id}`;

            return (
              <>
                <Link
                  key={subCat._id}
                  to={link}
                  className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer ${
                    subId === subCat._id ? "bg-green-100" : ""
                  }`}
                >
                  <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                    <img
                      className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                      alt={subCat.name}
                      src={subCat.image}
                    />
                  </div>
                  <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                    {subCat.name}
                  </p>
                </Link>
              </>
            );
          })}
        </div>

        {/* product listing */}
        <div className="">
          <div className="bg-white shadow-md p-4">
            <h3 className="font-semibold"> {subCategory}</h3>
          </div>
          {/* display products */}
          <div className="min-h-[75] max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4 gap-4">
              {data.map((p, index) => {
                return (
                  <div key={p._id}>
                    {!p || p.length === 0 ? (
                      <NoData />
                    ) : (
                      <CardProudcts
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* display loading if data load */}
          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductsListPage;
