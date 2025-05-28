import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common/summaryApi";
import UserProfileAvatarEdit from "../components/UserProfileAvtatorEdit";
import { setUserDetails } from "../store/userSlice";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import fetchedUserDetails from "../Utils/fetchedUserDetails";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setOpenProfileavatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);
  const handleOnChnage = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.updateUserDetails,
        data: userData,
      });
      const { data: responseData } = response;

      if (responseData.succes) {
        toast.success(responseData.message);
        const userDetails = await fetchedUserDetails();
        const resData = userDetails.data.data;
        dispatch(setUserDetails(resData));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* upload profile image and show profile image */}
      <div className="w-20 h-20 flex items-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img
            alt={user.name}
            src={`${user.avatar}?t=${Date.now()}`}
            className="w-full h-full"
          />
        ) : (
          <FaUserCircle size={70} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileavatarEdit(true)}
        className="min-w-20 border-primary-100 hover:border-primary-200 hover:bg-primary-200 text-sm border px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileavatarEdit(false)} />
      )}

      {/* edit user details like name email and much more */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label id="name">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded "
            value={userData.name}
            name="name"
            id="name"
            onChange={handleOnChnage}
            required
          />
        </div>
        <div className="grid">
          <label id="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded "
            value={userData.email}
            name="email"
            id="email"
            onChange={handleOnChnage}
            required
          />
        </div>
        <div className="grid">
          <label id="mobile">Mobile:</label>
          <input
            type="text"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded "
            value={userData.mobile}
            name="mobile"
            id="mobile"
            onChange={handleOnChnage}
            required
          />
        </div>
        <button className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded">
          {loading ? "Loading......." : " Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
