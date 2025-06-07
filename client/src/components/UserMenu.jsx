import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common/summaryApi";
import { logout } from "../store/userSlice";
import Axios from "../Utils/Axios";
import axiosToastError from "../Utils/axiosToastError";
import Divider from "./Divider";
import IsAdmin from "./IsAdmin";

const UserMenu = ({ close }) => {
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
  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm text-center flex gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          <span className="font-medium text-green-600">
            {user.role === "ADMIN" && " (ADMIN)"}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <FaRegEdit size={15} color="green" />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1 pt-2">
        {IsAdmin(user) && (
          <>
            <Link
              onClick={handleClose}
              to={"/dashboard/category"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Category
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/sub-category"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Sub Category
            </Link>
            <Link
              onClick={handleClose}
              to={"/dashboard/upload-product"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Upload Product
            </Link>
            <Link
              onClick={handleClose}
              to={"/dashboard/products"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Products
            </Link>
          </>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Order
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
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
