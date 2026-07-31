import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="text-red-800 font-semibold text-lg text-center ">
        Order Cancelled.
      </p>
      <Link
        to={"/"}
        className="border border-red-900 text-red-900 px-4 py-1 hover:bg-red-950 hover:text-white transition-all rounded"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Cancel;
