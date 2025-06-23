import React from "react";

const ProductCardAdmin = ({ data }) => {
  return (
    <div className="w-36 grid p-4  bg-white rounded shadow-sm border">
      <img
        src={data?.image[0]}
        alt={data?.name}
        className="w-full h-full object-scale-down"
      />
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-slate-500">{data?.unit}</p>
    </div>
  );
};

export default ProductCardAdmin;
