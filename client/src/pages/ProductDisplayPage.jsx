import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import image2 from "../assets/Best_Prices_Offers.png";
import image1 from "../assets/minute_delivery.png";
import image3 from "../assets/Wide_Assortment.png";
import summaryApi from "../common/summaryApi";
import AddToCartButton from "../components/AddToCartButton";
import Divider from "../components/Divider";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";
import { PriceWithDiscount } from "../Utils/PriceWithDiscount";

const ProductDisplayPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const params = useParams();
  const imageContianer = useRef();

  const { id } = params;

  const fetchedProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.getProductDetails,
        data: {
          productId: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedProductDetails();
  }, [params]);
  // image scroll right
  const handleScrollRight = () => {
    imageContianer.current.scrollLeft += 100;
  };

  // image scroll Left
  const handleScrollLeft = () => {
    imageContianer.current.scrollLeft -= 100;
  };
  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      {/* product images */}
      <div className="">
        {/* main image */}
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={productData.image[image]}
            className="w-full h-full object-scale-down"
          />
        </div>
        {/* slider button */}

        <div className="flex items-center justify-center  gap-3 p-4">
          {productData.image.map((img, index) => {
            return (
              <div
                key={index}
                className={`bg-slate-200 h-3 w-3 lg:h-5 lg:w-5 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>

        {/* rest images  */}
        <div className="grid relative ">
          <div
            ref={imageContianer}
            className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
          >
            {productData.image.map((img, index) => {
              return (
                <div
                  key={index}
                  className="h-20  w-20 min-h-20 min-w-20 shadow-md cursor-pointer scroll-mx-72"
                >
                  <img
                    src={img}
                    alt="min-Product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          <div className=" h-full -ml-4 z-15 w-full flex justify-between  absolute ">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow-md"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative p-1 rounded-full shadow-md"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* more detail of product */}
        <div className="my-4  hidden lg:grid gap-3">
          {/* description */}
          <div className="">
            <p className="font-semibold">Description</p>
            <p>{productData.description}</p>
          </div>
          {/* unit */}
          <div className="">
            <p className="font-semibold">Unit</p>
            <p>{productData.unit}</p>
          </div>
          {/* more detail */}
          {productData?.more_details &&
            Object.keys(productData?.more_details).map((ele, index) => {
              return (
                <div key={ele + index} className="">
                  <p className="font-semibold">{ele}</p>
                  <p>{productData?.more_details[ele]}</p>
                </div>
              );
            })}
        </div>
      </div>

      {/* product content  */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green w-fit px-2 rounded-full ">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">
          {productData.name}
        </h2>
        <p className="">{productData.unit}</p>
        <Divider />
        <div className="flex items-center gap-2 lg:gap-4">
          <p className="">Price</p>
          <div className="border border-green-500 px-4 py-2 rounded bg-green-50 w-fit">
            <p className="font-semibold text-lg lg:text-xl">
              {DisplayPriceInPKR(
                PriceWithDiscount(productData.price, productData.discount)
              )}
            </p>
          </div>
          {/* show actula price */}
          {productData.discount && productData.discount != 0 && (
            <p className="line-through">
              {DisplayPriceInPKR(productData.price)}
            </p>
          )}

          {/* show discount if available */}
          {productData.discount && (
            <p className="font-bold text-green-600 lg:text-2xl">
              {productData.discount}%
              <span className="text-base text-neutral-500"> Discount</span>
            </p>
          )}
        </div>
        {productData.stock <= 0 ? (
          <p className="text-lg text-red-500 py-2 ">Out Of Stack</p>
        ) : (
          <div className="py-4">
            <AddToCartButton data={productData} />
          </div>
        )}

        <Divider />
        <h2 className="font-semibold">Why shop from blinkeyit?</h2>
        <div>
          <div className="flex items-center gap-4 my-4 ">
            <img src={image1} alt="superfast Devlivery" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Super Fast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest dark
                store near you.{" "}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4 ">
            <img
              src={image2}
              alt="Best Prices & Offers"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best prices Destination with offers dirctly form the
                manufacture.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 my-4 ">
            <img src={image3} alt="Wide Assortments" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortments</div>
              <p>
                Choose from 5000+ products across food peronal care, household &
                other categories.
              </p>
            </div>
          </div>

          {/* product content for mobile version */}
          <div className="my-4 grid lg:hidden gap-3">
            {/* description */}
            <div className="">
              <p className="font-semibold">Description</p>
              <p>{productData.description}</p>
            </div>
            {/* unit */}
            <div className="">
              <p className="font-semibold">Unit</p>
              <p>{productData.unit}</p>
            </div>
            {/* more detail */}
            {productData?.more_details &&
              Object.keys(productData?.more_details).map((ele, index) => {
                return (
                  <div key={ele + index} className="">
                    <p className="font-semibold">{ele}</p>
                    <p>{productData?.more_details[ele]}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
