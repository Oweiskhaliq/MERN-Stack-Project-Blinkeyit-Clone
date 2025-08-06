import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bannerMobile from "../assets/banner-mobile.jpg";
import banner from "../assets/banner.jpg";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import { ValidURLConverter } from "../Utils/ValidURLConverter";
const Home = () => {
  const loadingCategory = useSelector(
    (state) => state.products.loadingCategory
  );
  const categoryData = useSelector((state) => state.products.allCategory);
  const subCategoryData = useSelector((state) => state.products.allSubCategory);
  const navigate = useNavigate();
  // handle redirect to product listing page

  const handleRedirectProductListingPage = (id, name) => {
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
  return (
    <section className="min-h-[78vh]  bg-white">
      <div className="container  mx-auto ">
        <div
          className={`h-full w-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          }`}
        >
          {/* desktop image */}
          <img
            src={banner}
            alt="banner"
            className="w-full h-full  hidden lg:block"
          />
          {/* mobile image */}
          <img
            src={bannerMobile}
            alt="banner"
            className="w-full h-full  lg:hidden"
          />
        </div>
        {/* display All Category */}
        <div className="container mx-auto px-4 py-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {loadingCategory
            ? new Array(12).fill(null).map((c, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-sm animate-pulse"
                  >
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                );
              })
            : categoryData.map((cat, index) => {
                return (
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      handleRedirectProductListingPage(cat._id, cat.name)
                    }
                    key={cat._id + index}
                  >
                    <div>
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-scale-down rounded"
                      />
                    </div>
                  </div>
                );
              })}
        </div>

        {/* display Category voice Products */}
        {categoryData.map((cat, index) => {
          return (
            <CategoryWiseProductDisplay
              key={cat._id + index}
              id={cat._id}
              name={cat.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
