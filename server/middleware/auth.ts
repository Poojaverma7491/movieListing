import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const auth = async (
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token =
      request.cookies?.accessToken || request.cookies?.token || 
      request.headers?.authorization?.split(' ')[1];

    if (!token) {
      return response.status(401).json({
        message: 'Provide token',
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN as string
    ) as { id: string };
    
    if (!decoded?.id) {
      return response.status(401).json({
        message: 'Unauthorized access',
        error: true,
        success: false,
      });
    }

    request.userId = decoded.id;
    next();
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return response.status(500).json({
      message: 'Invalid or expired token',
      error: true,
      success: false,
    });
  }
};

export default auth;
