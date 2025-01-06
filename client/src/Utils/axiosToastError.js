import toast from "react-hot-toast";

import React from "react";

const axiosToastError = (error) => {
  toast.error(error?.response?.data?.message);
};

export default axiosToastError;
