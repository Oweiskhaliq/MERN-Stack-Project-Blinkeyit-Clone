import { Link } from "react-router-dom";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";
import { PriceWithDiscount } from "../Utils/PriceWithDiscount";
import { ValidURLConverter } from "../Utils/ValidURLConverter";

const CardProudcts = ({ data }) => {
  const url = `/product/${ValidURLConverter(data.name)}/${data._id}`;

  return (
    <Link
      to={url}
      className="border  py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white  px-2"
    >
      <div className="min-h-20 w-full  max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          alt={data.name}
          className="w-full h-full object-scale-down rounded lg:scale-125"
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="rounded text-sm w-fit py-1 px-2 text-green-600 bg-green-50">
          10 min
        </div>
        <div>
          {data.discount && data.discount != 0 && (
            <p className="text-green-600 bg-green-100 py-1 px-2 w-fit rounded-full text-xs">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>
      <div className="font-medium   text-ellipsis line-clamp-2  lg:text-base text-sm  ">
        {data.name}
      </div>
      <div className="w-fit lg:text-base text-sm">{data.unit}</div>
      <div className="flex items-center  justify-between gap-1   lg:gap-3 lg:text-base text-sm  ">
        <div className="font-semibold">
          {DisplayPriceInPKR(PriceWithDiscount(data.price, data.discount))}
        </div>
        <div className="">
          {data.stock ? (
            <button className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 p-1 rounded">
              Add
            </button>
          ) : (
            <p className="text-red-500  text-xs text-center">Out of stock</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardProudcts;
