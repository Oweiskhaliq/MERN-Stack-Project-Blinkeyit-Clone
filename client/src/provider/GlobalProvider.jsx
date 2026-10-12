import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common/summaryApi";
import { handleAddAddress } from "../store/addressesSlice";
import { handleAddToCart } from "../store/cartProductSlice";
import Axios from "../Utils/Axios";
import AxiosToastError from "../Utils/axiosToastError";
import { PriceWithDiscount } from "../Utils/PriceWithDiscount";

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPriceWithOutDiscount, setTotalPriceWithOutDiscount] = useState(0);
  const user = useSelector((state) => state.user);

  // get cart item from store
  const cartItem = useSelector((state) => state.cartItem.cart);

  //calculating the total price and quantity of card items
  useEffect(() => {
    // calculate total with discount price
    const totalPriceWithDiscount = cartItem.reduce((acc, cur) => {
      const priceAfterDiscount = PriceWithDiscount(
        cur?.productId?.price,
        cur?.productId?.discount
      );
      return acc + priceAfterDiscount * cur?.quantity;
    }, 0);

    setTotalPrice(totalPriceWithDiscount);

    // calculate total without discount price
    const totalPriceWithOutDiscount = cartItem.reduce(
      (acc, cur) => acc + cur?.productId?.price * cur?.quantity,

      0
    );
    setTotalPriceWithOutDiscount(totalPriceWithOutDiscount);

    // calculate total quantity
    const qty = cartItem.reduce((acc, cur) => acc + cur.quantity, 0);
    setTotalQuantity(qty);
  }, [cartItem]);

  // fetch cart items
  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getCartItems,
      });
      const { data: responseData } = response;
      if (responseData?.success) {
        dispatch(handleAddToCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // increse and decrease card quantity
  const updateCardItem = async (id, quantity) => {
    try {
      const response = await Axios({
        ...summaryApi.updateCartQuantity,
        data: {
          _id: id,
          quantity: quantity,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItems();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  // delete cart item
  const deleteCartItem = async (id) => {
    try {
      const response = await Axios({
        ...summaryApi.deleteCartItem,
        data: {
          _id: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  //empty the card items to when user log out
  const handleLogout = () => {
    localStorage.clear();
    dispatch(handleAddToCart([]));
  };

  //fetching the user address
  const fetchUserAddress = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getAddress,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  //when the app load call the fetchCartItems
  useEffect(() => {
    fetchCartItems();
    // handleLogout();
    fetchUserAddress();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        handleLogout,
        fetchCartItems,
        updateCardItem,
        deleteCartItem,
        fetchUserAddress,
        totalPrice,
        totalQuantity,
        totalPriceWithOutDiscount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
