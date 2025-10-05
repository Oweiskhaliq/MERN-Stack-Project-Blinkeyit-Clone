import AddressModel from "../models/address.model.js";
import userModel from "../models/user.model.js";

export const addAddressController = async (request, respone) => {
  try {
    const userId = request.userId;
    const { address_line, city, state, pincode, country, mobile } =
      request.body;
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return respone.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const saveAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      userId: userId,
    });
    saveAddress.save();

    // If userId exists, link address to user
    if (userId) {
      const daveUserAddressId = await userModel.findByIdAndUpdate(userId, {
        $push: {
          address_details: saveAddress._id,
        },
      });
    }

    respone.status(201).json({
      message: "Address created successfully",
      success: true,
      error: false,
      data: saveAddress,
    });
  } catch (error) {
    respone.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// get address controller
export const getAddressController = async (request, respone) => {
  try {
    const userId = request.userId;
    const address = await AddressModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (!address) {
      return respone.status(404).json({
        message: "Address not found",
        success: false,
        error: true,
      });
    }

    respone.status(200).json({
      message: "Address found",
      success: true,
      error: false,
      data: address,
    });
  } catch (error) {
    respone.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// update address controller
export const updateAddressController = async (request, respone) => {
  try {
    const userId = request.userId;
    const { _id, address_line, city, state, pincode, country, mobile } =
      request.body;

    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return respone.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const updateAddress = await AddressModel.findByIdAndUpdate(_id, {
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    });
    return respone.status(200).json({
      message: "Address updated successfully",
      success: true,
      error: false,
      data: updateAddress,
    });
  } catch (error) {
    respone.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//delete controller
export const deleteAddressController = async (request, respone) => {
  try {
    const userId = request.userId;
    const { _id } = request.body;
    if (!_id) {
      return respone.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const deleteAddress = await AddressModel.updateOne(
      { _id: _id, userId },
      { status: false }
    );
    return respone.status(200).json({
      message: "Address deleted successfully",
      success: true,
      error: false,
      data: deleteAddress,
    });
  } catch (error) {
    respone.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
