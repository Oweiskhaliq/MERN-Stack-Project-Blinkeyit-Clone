import React from "react";
import { MdClose } from "react-icons/md";

const AddMoreFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-800 z-50 bg-opacity-70 flex items-center justify-center p-4 ">
      <div className="bg-white rounded p-4 w-full max-w-md ">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Field</h1>
          <button onClick={close}>
            <MdClose size={20} />
          </button>
        </div>
        <input
          className="bg-blue-50 p-2 py-3 border outline-none focus-within:border-primary-200 rounded w-full"
          placeholder="Enter the Field Name"
          value={value}
          onChange={onChange}
        />
        <button
          onClick={submit}
          className="bg-primary-200 mt-2 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block"
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddMoreFieldComponent;
