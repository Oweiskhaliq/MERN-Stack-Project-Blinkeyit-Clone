import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [loaction]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full  min-w-[300px]  lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center  text-neutral-500 bg-slate-50 group focus-within:border-primary-200">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full p-3 m-1 group group-focus-within:text-primary-200 bg-white rounded-full shadow-lg"
          >
            <FaArrowLeft size={26} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group group-focus-within:text-primary-200 ">
            <FaSearch size={22} />
          </button>
        )}
      </div>
      <div className="h-full w-full">
        {!isSearchPage ? (
          //if not in search Page
          <div
            onClick={redirectToSearchPage}
            className="h-full w-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Search 'milk'",
                1000,
                "Search 'bread'",
                1000,
                "Search 'sugar'",
                1000,
                "Search 'panner'",
                1000,
                "Search 'chocolates'",
                1000,
                "Search 'curd'",
                1000,
                "Search 'rice'",
                1000,
                "Search 'egg'",
                1000,
                "Search 'chips'",
                1000,
                "Search 'blue band'",
                1000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //if in search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search atta daal and More."
              className="w-full h-full bg-transparent outline-none"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
