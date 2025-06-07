import { useSelector } from "react-redux";
import IsAdmin from "../components/IsAdmin";

const AdminPermissions = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {IsAdmin(user) ? (
        children
      ) : (
        <p className="text-red-600 bg-red-100 p-4 ">Do not have Permission.</p>
      )}
    </>
  );
};

export default AdminPermissions;
