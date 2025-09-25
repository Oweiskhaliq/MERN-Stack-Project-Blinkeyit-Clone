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
