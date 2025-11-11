import type { Request, Response } from 'express';
import sendEmail from '../config/sendEmail.ts';
import UserModel from '../models/user.model.ts';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.ts';
import generatedAccessToken from '../utils/generatedAccessToken.ts';
import generatedRefreshToken from '../utils/generatedRefreshToken.ts';
import type { CookieOptions } from 'express';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Register
export async function registerUserController( req: Request, res: Response ): Promise<Response> {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'Provide email, fullName, password',
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'Email already registered',
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({ fullName, email, password: hashPassword });
    const savedUser = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;

    await sendEmail({
      sendTo: email,
      subject: 'Verify email from Movies',
      html: verifyEmailTemplate({ fullName, url: verifyEmailUrl }),
    });

    return res.status(201).json({
      message: 'User registered successfully',
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
}

// Verify Email
export async function verifyEmailController( req: Request, res: Response ): Promise<Response> {
  try {
    const { code } = req.body;

    const user = await UserModel.findById(code);
    if (!user) {
      return res.status(400).json({
        message: 'Invalid code',
        success: false,
      });
    }

    await UserModel.updateOne({ _id: code }, { verify_email: true });

    return res.json({
      message: 'Email verified',
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
}

// Login
export async function loginController( req: Request, res: Response ): Promise<Response>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "provide email, password",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none', 
     };

    res.cookie("accessToken", accesstoken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error : any) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

// Logout
export async function logoutController( req: AuthenticatedRequest, res: Response ): Promise<Response> {
  try {
    const userid = req.userId;

    if (!userid) {
      return res.status(400).json({
        message: 'Missing user ID from middleware.',
        success: false,
      });
    }

    const cookiesOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/', 
    };

    res.clearCookie('accessToken', cookiesOption);
    res.clearCookie('refreshToken', cookiesOption);

    await UserModel.findByIdAndUpdate(userid, {
      refresh_token: '',
    });

    return res.json({
      message: 'Logout successfully',
      success: true,
    });
  } catch (error: any) {
     return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

// Check User
export async function getLoggedInUserController( req: AuthenticatedRequest, res: Response ): Promise<Response> {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false,
      });
    }

    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
}

//Google OAth
export async function googleOAuthCallbackController( req: AuthenticatedRequest,  res: Response ): Promise<Response> {
  try {
    const { fullName, email, googleId, avatar } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({
        message: 'Missing Google user info',
        success: false,
      });
    }

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        fullName,
        email,
        verify_email: true,
        status: 'Active',
        refresh_token: googleId,
      });

      await user.save();
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    const cookiesOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    };

    res.cookie('accessToken', accesstoken, cookiesOption);
    res.cookie('refreshToken', refreshToken, cookiesOption);

    return res.json({
      message: 'Google login successful',
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
}

