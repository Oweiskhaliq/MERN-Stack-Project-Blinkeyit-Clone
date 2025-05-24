import jwt from "jsonwebtoken";
const auth = async (request, response, next) => {
  try {
    //access the access token
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return response.status(401).json({
        message: "provide Access Token",
      });
    }

    // verifying Token
    const decodedToken = await jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );
    if (!decodedToken) {
      return response.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }
    request.userId = decodedToken.id;
    next();
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default auth;
