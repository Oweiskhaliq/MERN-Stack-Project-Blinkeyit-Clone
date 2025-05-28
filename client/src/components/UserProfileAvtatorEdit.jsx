import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common/summaryApi";
import { updatedAvatar } from "../store/userSlice"; // ✅ Correct import
import Axios from "../Utils/Axios";
import axiosToastError from "../Utils/axiosToastError";

const UserProfileAvatarEdit = ({ close }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const handleSumit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatorImage = async (e) => {
    const file = e?.target?.files[0];
    if (!file) {
      toast.error("No file was selected!");
      // return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.uploadAvatar,
        data: formData,
      });

      const avatar = response?.data?.data?.avatar;
      if (!avatar) {
        toast.error("No avatar returned from server!");
        console.error("Full responseData:", response?.data);
        return;
      }

      dispatch(updatedAvatar(avatar));
      toast.success(response.data.message || "Avatar updated!");
    } catch (error) {
      console.error("Upload error:", error);
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-900 w-fit block ml-auto"
        >
          <MdClose size={20} />
        </button>
        <div className="w-20 h-20 flex items-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img
              alt={user.name}
              src={`${user.avatar}?t=${Date.now()}`}
              className="w-full h-full"
              onError={(e) => (e.target.src = "/default-avatar.png")}
            />
          ) : (
            <FaUserCircle size={70} />
          )}
        </div>

        <form onSubmit={handleSumit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-100 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
              {loading ? "Uploading..." : "Upload"}
            </div>
          </label>

          <input
            type="file"
            accept="image/*"
            id="uploadProfile"
            hidden
            onChange={handleUploadAvatorImage}
          />
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
