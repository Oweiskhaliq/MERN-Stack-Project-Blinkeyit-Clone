import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useMobile from "../hooks/useMobile";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();

  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state.user);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  // login page navegate
  const navigate = useNavigate();
  const redirecToLoginPage = () => {
    navigate("/login");
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user-mobile");
  };
  return (
    <header className="h-24 lg:h-20 lg:shadow-lg sticky top-0   flex  justify-center flex-col gap-1 bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto flex items-center h-full px-2 justify-between">
          {/* Logo */}
          <Link to={"/"} className="h-full">
            <div className="h-full flex  justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="LOGO"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="LOGO"
                className="lg:hidden"
              />
            </div>
          </Link>
          {/* search */}

          <div className="hidden lg:block">
            <Search />
          </div>
          {/* user and cart */}
          <div>
            {/* Mobile */}
            <button
              onClick={handleMobileUser}
              className="text-neutral-600 lg:hidden"
            >
              <FaRegUserCircle size={26} />
            </button>

            {/* Disktop  */}
            <div className="hidden lg:flex gap-10">
              {user._id ? (
                <div className="relative ">
                  <div
                    onClick={() => setOpenUserMenu((Prev) => !Prev)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <TiArrowSortedUp size={25} />
                    ) : (
                      <TiArrowSortedDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-8">
                      <div className="bg-white rounded p-2 min-w-52 lg:shadow-lg">
                        <UserMenu />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirecToLoginPage} className="text-lg p-2">
                  Login
                </button>
              )}

              {/* Cart Icons */}
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 hover:text-xl rounded-lg p-3 text-white">
                <div className="animate-bounce ">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
