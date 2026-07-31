import toast from "react-hot-toast";
import { FaCaretRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import emptyCardImage from "../assets/empty_cart.webp";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInPKR } from "../Utils/DisplayPriceInPKR";
import { PriceWithDiscount } from "../Utils/PriceWithDiscount";
import AddToCartButton from "./AddToCartButton";

const DisplayCartItem = ({ close }) => {
  const { totalPrice, totalPriceWithOutDiscount, totalQuantity } =
    useGlobalContext();
  const cartItems = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  //redirect to check out page
  const redirectToCheckoutPage = () => {
    if (user) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast.error("please login First.");
  };

  return (
    <div className="bg-neutral-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex justify-between items-center shadow-md p-2">
          <h2 className="font-semibold">Cart</h2>
          <button onClick={close}>
            {/* for mobile  */}
            <Link to="/" className="lg:hidden">
              <IoClose size={25} />
            </Link>

            {/* for desktop  */}
            <IoClose size={25} className="hidden lg:block" />
          </button>
        </div>

        {/* cart proceed section */}
        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-130px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/* display cart items */}

          {cartItems[0] ? (
            <>
              {/* price section  */}
              <div className="flex items-center justify-between  py-2 px-4 bg-blue-100 text-blue-500 rounded-full">
                <p>Your Total savings</p>
                <p>
                  {DisplayPriceInPKR(totalPriceWithOutDiscount - totalPrice)}
                </p>
              </div>
              {/* rest items of cart */}
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItems[0] &&
                  cartItems.map((item, index) => {
                    return (
                      <div key={"card_items"+index} className="flex items-center w-full gap-4">
                        <div className="w-16 min-h-16 min-w-16 h-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm  text-xs">
                          <p className=" text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p>
                            {DisplayPriceInPKR(
                              PriceWithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <AddToCartButton data={item.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* cart billing detials */}
              <div className="bg-white p-4">
                <h3 className="font-semibold">Bill Details</h3>
                <div className="flex gap-4 justify-between ml-1 ">
                  <p>Items Total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPriceInPKR(totalPriceWithOutDiscount)}
                    </span>
                    <span>{DisplayPriceInPKR(totalPrice)}</span>
                  </p>
                </div>

                <div className="flex gap-4 justify-between ml-1">
                  <p>Quantity Total</p>
                  <p className="flex items-center gap-2">
                    {totalQuantity} items
                  </p>
                </div>

                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charges</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>

                <div className=" font-semibold flex gap-4 justify-between ">
                  <p>Grand Total</p>
                  <p className="">{DisplayPriceInPKR(totalPrice)}</p>
                </div>
              </div>

              {/* cart proceed section  */}
              <div className="p-2">
                <div className="bg-green-700 text-neutral-100 p-2 static bottom-3 rounded flex items-center gap-4 justify-between px-4 font-bold ">
                  <div>
                    <div>{DisplayPriceInPKR(totalPrice)}</div>
                  </div>
                  <button
                    onClick={redirectToCheckoutPage}
                    className="flex items-center gap-1 hover:"
                  >
                    Proceed <FaCaretRight />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white flex flex-col items-center justify-center">
              <img
                src={emptyCardImage}
                alt="cart empty "
                className="h-full w-full object-scale-down"
              />
              <Link
                onClick={close}
                to={"/"}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayCartItem;
