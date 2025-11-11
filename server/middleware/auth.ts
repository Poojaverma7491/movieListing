import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = async ( req: AuthenticatedRequest, res: Response, next: NextFunction ): Promise<Response | void> => {
  try {
    const token =
      req.cookies?.accessToken || req.cookies?.token || 
      req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Provide token',
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN as string
    ) as { id: string };
    
    if (!decoded?.id) {
      return res.status(401).json({
        message: 'Unauthorized access',
        success: false,
      });
    }

    req.userId = decoded.id;
    next();
  } catch (error: unknown) {
    return res.status(500).json({
      message: 'Invalid or expired token',
      success: false,
    });
  }
};

export default auth;
