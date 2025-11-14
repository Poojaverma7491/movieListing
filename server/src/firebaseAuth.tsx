import admin from "./firebaseAdmin";
import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.model";

interface AuthRequest extends Request {
  user?: any;
}

const firebaseAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;

    let user = await UserModel.findOne({ firebaseUid });
    if (!user) {
      user = await UserModel.create({
        firebaseUid,
        email: decoded.email,
        name: decoded.name || decoded.email,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default firebaseAuth;
