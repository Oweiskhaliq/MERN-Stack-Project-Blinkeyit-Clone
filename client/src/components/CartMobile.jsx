import { FaCaretRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";

const CartMobile = () => {
  const { totalPrice, totalQuantity } = useGlobalContext();
  const cartItems = useSelector((state) => state.cartItem.cart);

  return (
    <>
      {cartItems[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-600 p-2 rounded text-neutral-100 text-sm flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              {/* card icon */}
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartShopping />
              </div>
              {/* card price and quantity  */}
              <div className="text-xs">
                <p>{totalQuantity} Items</p>
                <p>{DisplayPriceInPKR(totalPrice)}</p>
              </div>
            </div>
            {/* card link  */}
            <Link to="/cart" className="flex gap-1 items-center ">
              <span className="text-sm">View Cart</span>

              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
