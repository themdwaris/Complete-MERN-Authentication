import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userAuthModel from "../model/userAuthModel.js";
import transporter from "../config/nodeMailer.js";

//***********************Register***********************
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ message: "Enter the all details", success: false });
    }

    const isUserExist = await userAuthModel.findOne({ email });
    if (isUserExist) {
      return res.json({ message: "User is alredy exist", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userAuthModel({ name, email, password: hashedPassword });
    await user.save();

    const token = await jwt.sign(
      { id: user?._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    //Sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Practice world",
      text: `Your account has been created with email id: ${email}, Here you can practice all your problems`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "Sign Up Successfull", success: true });
  } catch (error) {
    return res.json({ message: error?.message || error, success: false });
  }
};

//***********************Login***********************
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Please enter credentials", success: false });
    }
    const user = await userAuthModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid email or password", success: false });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.json({ message: "Wrong password", success: false });
    }

    const token = await jwt.sign(
      { id: user?._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Login Successfull", success: true });
  } catch (error) {
    return res.json({ message: error?.message || error, success: false });
  }
};

//***************** Logout ******************* */

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ message: "Logged out", success: true });
  } catch (error) {
    return res.json({ message: error?.message || error, success: false });
  }
};

//***************** Verify Email ******************* */

export const sendVerifyEmailOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userAuthModel.findById(userId);
    if (user?.isAccountVerified) {
      return res.json({
        message: "Account is already verified",
        success: false,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOTP = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user?.email,
      subject: "Email Verification OTP",
      text: `Your verificaton OTP code is ${otp} , Verify your account using this OTP code.`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      message: "OTP sent successfully to your email",
      success: true,
    });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.json({ message: "Missing details", success: false });
    }

    const user = await userAuthModel.findById(userId);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ message: "Invalid OTP" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ message: "Your OTP is expired", success: false });
    }

    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ message: "Email verify successfully", success: true });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};

//************ Check whether user is authenticated or not ************ */

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};

//************ Reset password ************ */

export const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ message: "Email is required", success: false });
    }
    const user = await userAuthModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not found" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user?.email,
      subject: "Password Reset OTP ",
      text: `Your reset password OTP code is ${otp} , Reset your password using this OTP code.`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ message: "Your OTP is sent to your email", success:true });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.json({ message: "Missing details", success: false });
    }
    const user = await userAuthModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ message: "Invalid OTP", success: false });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ message: "OTP is expired", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp=''
    user.resetOtpExpireAt=0

    await user.save()

    return res.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.json({ message: error.message || error, success: false });
  }
};
