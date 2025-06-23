import React from "react";
import { MdClose } from "react-icons/md";
const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-70 flex items-center z-50 justify-center p-4">
      <div className="w-full max-w-md p-4 bg-white max-h-[80vh]">
        <button className="w-fit ml-auto block" onClick={close}>
          <MdClose size={25} />
        </button>
        <img
          src={url}
          alt="Full Screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
};

export default ViewImage;
