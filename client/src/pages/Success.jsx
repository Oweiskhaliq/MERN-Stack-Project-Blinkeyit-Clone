import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  // Safe access
  const message = location.state?.text || "Payment";

  return (
    <div className="m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="text-green-800 font-semibold text-lg text-center">
        {message} successfully.
      </p>

      <Link
        to={"/"}
        className="border border-green-900 text-green-900 px-4 py-1 hover:bg-green-950 hover:text-white transition-all rounded"
      >
        Go To Home
      </Link>
    </div>
  );
};

export default Success;
