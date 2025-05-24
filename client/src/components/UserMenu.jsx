import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import { logout } from "../store/userSlice";
import Axios from "../Utils/Axios";
import axiosToastError from "../Utils/axiosToastError";
import Divider from "./Divider";
const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //logout
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...summaryApi.logout,
      });

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      axiosToastError(error);
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user.name || user.mobile}</div>

      <Divider />

      <div className="text-sm grid gap-1 pt-2">
        <Link to={""} className="px-2 hover:bg-orange-200 py-1">
          My Order
        </Link>
        <Link to={""} className="px-2 hover:bg-orange-200 py-1">
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
