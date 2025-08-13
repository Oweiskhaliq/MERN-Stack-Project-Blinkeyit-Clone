import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import summaryApi from "../common/summaryApi";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";

const AddToCartButton = ({ data }) => {
  const { fetchCartItems, updateCardItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cartItem.cart);
  const [itemAvalableInCart, setItemAvalableInCart] = useState(false);
  const [cartItemQuantity, setCartItemQuantity] = useState(0);
  const [cartItemDetail, setCartItemDetail] = useState();

  // check if item avalible in card or not
  useEffect(() => {
    const checkItemInCart = cartItems.some(
      (item) => item.productId._id === data._id
    );
    setItemAvalableInCart(checkItemInCart);

    // finding the product quantity in cart

    const product = cartItems.find((item) => item.productId._id === data._id);
    setCartItemQuantity(product?.quantity);
    setCartItemDetail(product);
  }, [data, cartItems]);

  // increment quantity
  const handleIncrement = async (e) => {
    e.preventDefault();

    const response = await updateCardItem(
      cartItemDetail?._id,
      cartItemQuantity + 1
    );

    if (response.success) {
      toast.success("Item added to cart");
    }
  };

  // decrement quantity
  const handleDecrement = async (e) => {
    e.preventDefault();

    if (cartItemQuantity === 1) {
      deleteCartItem(cartItemDetail?._id);
    } else {
      const response = await updateCardItem(
        cartItemDetail?._id,
        cartItemQuantity - 1
      );
      if (response.success) {
        toast.success("Item Remove from cart");
      }
    }
  };

  // add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await Axios({
        ...summaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
      }
    } catch (error) {
      console.log(error, "Errorsss");
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-[150px]">
      {itemAvalableInCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={handleDecrement}
            className="bg-green-600 hover:bg-green-700 text-white py-1 px-1 flex items-center justify-center rounded"
          >
            <FaMinus />
          </button>

          <p className="flex-1 flex items-center justify-center px-1 font-semibold">
            {cartItemQuantity}
          </p>
          <button
            onClick={handleIncrement}
            className="bg-green-600 hover:bg-green-700 text-white flex-1  py-1 px-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 p-1 rounded"
        >
          {loading ? <loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
