import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json({
        message: "Not authorized login again",
        success: false,
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodeToken.id) {
      if (!req.body) {
        req.body = {};
      }
      req.body.userId = decodeToken.id;
    } else {
      return res.json({
        message: "User is not authorized login again",
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};

export default userAuth;


