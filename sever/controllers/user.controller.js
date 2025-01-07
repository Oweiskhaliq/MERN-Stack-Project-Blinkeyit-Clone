import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verfiyEmailTemplate from "../Utils/verifyEmailTemplate.js";
import generatedAccessToken from "../Utils/generatedAccessToken.js";
import generatedRefreshToken from "../Utils/generatedRefreshToken.js";
import generatedOtp from "../Utils/generatedOtp.js";
import forgetPasswordTemplete from "../Utils/forgotPasswardTemplete.js";
import uploadImageCloudinary from "../Utils/uploadImageCloudinary.js";
import jwt from "jsonwebtoken";

export const registerUserController = async (request, response) => {
  try {
    // finding the fields from URl
    const { name, email, password } = request.body;
    // Checking The Field Avaliable or not
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide Email Name and Password.",
        error: true,
        success: false,
      });
    }
    // checking Email in the database
    const user = await UserModel.findOne({ email });
    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }
    // convert password to hash Format
    const slat = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, slat);

    // formating the fields
    const payload = {
      name,
      email,
      password: hashPassword,
    };

    // storing the data inside the dataBase.
    const newUser = new UserModel(payload);
    const save = await newUser.save();

    // Verfiying Email
    const verifyEmailUrl = `${process.env.FORNTEND_URL}/verify-email?code=${save?._id}`;
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Email From Blinkeyit.",
      html: verfiyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    // seding Response To user
    return response.json({
      message: "User Created Successfully.",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    //if error
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// verifying email and changing the verifyEmail field status
export const verifyEmailController = async (request, response) => {
  try {
    const { code } = request.body;
    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return response.status(400).json({
        message: "Invalid Code.",
        error: true,
        success: false,
      });
    }
    const updateUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );

    return response.json({
      message: "Email verifiction Done.",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};

// Login Controller
export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    //checking If the user enter details or not
    if (!email || !password) {
      return response.status(400).json({
        message: "Please Fill the Email and Password fields.",
        error: true,
        success: false,
      });
    }
    //finding user
    const user = await UserModel.findOne({ email });
    //checking user details in DB
    if (!user) {
      return response.status(400).json({
        message: "User not Register.",
        error: true,
        success: false,
      });
    }
    //checking user Status Active or Inactive
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact To Admin",
        error: true,
        success: false,
      });
    }

    // Decrypting the password
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({
        message: "Please check Your Password",
        error: true,
        success: false,
      });
    }
    //send token in cookies
    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.cookie("accessToken", accessToken, cookieOptions);
    response.cookie("refreshToken", refreshToken, cookieOptions);

    return response.json({
      message: "login Successfully.",
      success: true,
      error: false,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//logout  controller
export const logoutController = async (request, response) => {
  try {
    //clear the token and cookies
    const userid = request.userId; // come from auth  meddleware
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.clearCookie("accessToken", cookieOptions);
    response.clearCookie("refreshToken", cookieOptions);

    //refresh token  Remove from dB
    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });
    //sending the response
    return response.json({
      message: "User Logout Successfully.",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
//if the urser not login and forget pass.
export const forgetPasswordController = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(500).json({
        message: "User Not Register",
        error: true,
        success: false,
      });
    }
    //genarate OTP
    const otp = generatedOtp();
    const expireTime = new Date() + 60 * 60 * 1000; //1hr

    //save Otp and Expire time to DB
    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forget_password_expiry: new Date(expireTime).toISOString(),
    });

    //send Otp in email
    await sendEmail({
      sendTo: email,
      subject: "Forgot password from Blinkeyit.",
      html: forgetPasswordTemplete({
        name: user.name,
        otp: otp,
      }),
    });

    //send Response
    return response.json({
      message: "Check Your Email.",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// verifying the forgot password OTP
export const verifyForgotPassword = async (request, response) => {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "Please provide Email, OTP",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "Email Not Avalible.",
        error: true,
        success: false,
      });
    }
    // check otp expire
    const currentTime = new Date().toISOString();
    if (user.forget_password_expiry < currentTime) {
      return response.status(400).json({
        message: " OTP IS EXpired.",
        error: true,
        success: false,
      });
    }
    // if the OTP is Incurrect
    if (otp !== user.forgot_password_otp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "OTP verifyed Successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//reset the password
export const resetPassword = async (request, response) => {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message:
          "Please Provide the required field. email, newPassword, confirmPAssword.",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: " Email not avalible.",
        error: true,
        success: false,
      });
    }
    //check the newpassword and confirmPAssword
    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: " new Password and confrim Password must be Same.",
        error: true,
        success: false,
      });
    }
    //incrypt Password
    const slat = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, slat);

    const update = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return response.json({
      message: " password Updated Successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// upload Avator
export const uploadAvator = async (request, response) => {
  try {
    const userId = request.userId; //auth meddleware
    const image = request.file; // multer middleware
    // upload PIc
    const upload = await uploadImageCloudinary(image);
    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avtar: upload.url,
    });
    return response.json({
      message: "Image Uploaded Successfuly",
      error: false,
      succes: true,
      data: {
        avator: upload.url,
        _id: userId,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
};

//update User Details
export const updateUserDetails = async (request, response) => {
  try {
    const userId = request.userId; //auth meddleware
    const { name, email, password, mobile } = request.body;

    //decrypt password
    const hashPassword = "";
    if (password) {
      const slat = await bcryptjs.genSalt(10);
      await bcryptjs.hash(password, slat);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(password && { password: hashPassword }),
        ...(mobile && { mobile: mobile }),
      }
    );

    return response.json({
      message: "User Updated Successfully.",
      error: false,
      succes: true,
      data: updateUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
};

//Refresh Token Controller

export const RefreshToken = async (request, response) => {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.header?.authorization?.split(" ")[1];
    if (!refreshToken) {
      return response.status(400).json({
        message: "Invalid token",
        error: true,
        succes: false,
      });
    }

    //verify token
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return response.status(400).json({
        message: "Refresh token Expired",
        error: true,
        succes: false,
      });
    }

    //new refresh token
    const userId = verifyToken.id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.cookie("accessToken", newAccessToken), cookieOptions;

    return response.json({
      message: "new access token genarated",
      error: false,
      succes: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
};
