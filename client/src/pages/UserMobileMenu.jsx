import { MdClose } from "react-icons/md";
import UserMenu from "../components/UserMenu";

const UserMobileMenu = () => {
  return (
    <section className="bg-white h-full w-full py-2 px-4">
      <button
        onClick={() => window.history.back()}
        className="text-neutral-800 w-fit block ml-auto"
      >
        <MdClose size={25} />
      </button>
      <div className="container mx-auto p-3 pb-8 ">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMobileMenu;
