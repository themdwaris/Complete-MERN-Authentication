import userAuthModel from "../model/userAuthModel.js";

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userAuthModel.findById(userId);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    return res.json({
      userData: {
        email: user?.email,
        isUserVerified: user?.isAccountVerified,
        name: user?.name,
      },
      success: true,
    });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};
