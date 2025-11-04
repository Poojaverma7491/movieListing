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
export async function registerUserController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'Provide email, fullName, password',
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'Email already registered',
        error: true,
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
      error: false,
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      error: true,
      success: false,
    });
  }
}

// Verify Email
export async function verifyEmailController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { code } = req.body;

    const user = await UserModel.findById(code);
    if (!user) {
      return res.status(400).json({
        message: 'Invalid code',
        error: true,
        success: false,
      });
    }

    await UserModel.updateOne({ _id: code }, { verify_email: true });

    return res.json({
      message: 'Email verified',
      success: true,
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || 'Internal server error',
      error: true,
      success: false,
    });
  }
}

// Login
export async function loginController(
    req: Request,
    res: Response
): Promise<Response>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
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
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error : any) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Logout
export async function logoutController(
  request: AuthenticatedRequest,
  response: Response
): Promise<Response> {
  try {
    const userid = request.userId;

    if (!userid) {
      return response.status(400).json({
        message: 'Missing user ID from middleware.',
        error: true,
        success: false,
      });
    }

    // ✅ Match cookie clearing options exactly with login
    const cookiesOption: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/', // ✅ Add this to ensure proper clearing
    };

    response.clearCookie('accessToken', cookiesOption);
    response.clearCookie('refreshToken', cookiesOption);

    await UserModel.findByIdAndUpdate(userid, {
      refresh_token: '',
    });

    return response.json({
      message: 'Logout successfully',
      error: false,
      success: true,
    });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return response.status(500).json({
      message: err,
      error: true,
      success: false,
    });
  }
}


// Check User
export async function getLoggedInUserController(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}
