import { MdClose } from "react-icons/md";

const ConfirmBox = ({ close, cancel, confrim }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-4 rounded ">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-red-600">
            Category Will Be Delete Parmanently!
          </h1>
          <button onClick={close}>
            <MdClose size={25} />
          </button>
        </div>
        <p className="my-4 text-sm">
          Are You Sure to delete this category parmanently?
        </p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button
            onClick={cancel}
            className="px-4 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={confrim}
            className="px-4 py-1 rounded border border-green-600 text-gray-600 hover:bg-green-600 hover:text-white "
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox;
