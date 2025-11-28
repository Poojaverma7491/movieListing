import type { Request, Response } from "express";
import {User} from "../models/user.model"
import { admin } from "../FirebaseAdmin";

export async function getProfileController(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    res.json({ success: true, data: req.user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function logoutController(req: Request, res: Response): Promise<void> {
  try {
    res.json({
      success: true,
      message: "Logged out",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function googleLoginController(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization || "";
    const [, token] = authHeader.split(" ");

    if (!token) {
      res.status(401).json({ success: false, message: "Missing Authorization bearer token" });
      return;
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email, name: displayName, picture: photoURL } = decoded;
    const providerId = decoded.firebase?.sign_in_provider;

    const userDoc = await User.findOneAndUpdate(
      { uid },
      { $set: { email, displayName, photoURL, providerId } },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: userDoc });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
}
