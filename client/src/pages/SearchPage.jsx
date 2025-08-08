import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp";
import summaryApi from "../common/summaryApi";
import CardLoading from "../components/CardLoading";
import CardProudcts from "../components/CardProudcts";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";

const SearchPage = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const loadingArray = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();

  const searchQuery = params?.search?.slice(3);

  // fetching search data from server
  const fetchSearchData = async () => {
    setloading(true);
    try {
      const response = await Axios({
        ...summaryApi.searchProducts,
        data: {
          search: searchQuery,
          page: page,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setdata(responseData.data);
        } else {
          setdata(() => {
            return [...data, ...responseData.data];
          });
        }
      }
      setTotalPage(responseData.totalPage);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  // useEffect to call searchPage function when page changes

  useEffect(() => {
    fetchSearchData();
  }, [page, searchQuery]);

  //while scrollin go to next page
  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length} </p>

        {/* use react infinite scrolling component library */}
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          {/* show product and loading */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* show search product  */}
            {data.map((p, index) => {
              return <CardProudcts key={p._id} data={p} />;
            })}
            {/* loading */}
            {loading &&
              loadingArray.map((_, index) => {
                return <CardLoading key={index} />;
              })}
          </div>
        </InfiniteScroll>

        {/* if no data  */}
        {!data[0] && !loading && (
          <div className="flex flex-col  items-center w-full h-full mx-auto justify-center  ">
            <img
              alt="No Data"
              src={noDataImage}
              className="h-full w-full max-w-xs max-h-xs block"
            />
            <p className="text-neutral-500">No Data.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
