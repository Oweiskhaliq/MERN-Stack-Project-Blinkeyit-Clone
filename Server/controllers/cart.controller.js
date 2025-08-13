import CartProductModel from "../models/cartproduct.js";
import UserModel from "../models/user.model.js";

// add product to cart
export const addToCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { productId } = request.body;

    if (!productId) {
      return response.status(400).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }

    // check if product already in cart
    const ExistingCartProduct = await CartProductModel.findOne({
      productId: productId,
      userId: userId,
    });
    if (ExistingCartProduct) {
      return response.status(400).json({
        message: "Product already in cart",
        error: true,
        success: false,
      });
    }

    const cartProduct = new CartProductModel({
      productId: productId,
      quantity: 1,
      userId: userId,
    });
    const save = await cartProduct.save();

    const updateCardUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
    return response.json({
      message: "Item Added Successfuly.",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get the cart items
export const getCartItemsController = async (request, response) => {
  try {
    const userId = request.userId;
    const cartItems = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return response.json({
      message: "Cart Items",
      error: false,
      success: true,
      data: cartItems,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update card quantity
export const updateCartQuantityController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id, quantity } = request.body;

    if (!_id || !quantity) {
      return response.status(400).json({
        message: "Product Id and Quantity are required",
        error: true,
        success: false,
      });
    }
    const updatedCardItem = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      {
        quantity: quantity,
      }
    );

    return response.json({
      message: "Cart Item Updated Successfuly.",
      error: false,
      success: true,
      data: updatedCardItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//delete card item
export const deleteCartItemController = async (request, response) => {
  try {
    const userId = request.userId;
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "Product Id is required",
        error: true,
        success: false,
      });
    }
    const deleteCartItem = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });
    return response.json({
      message: "Cart Item Deleted Successfuly.",
      error: false,
      success: true,
      data: deleteCartItem,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
