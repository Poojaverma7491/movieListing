import type { Request, Response } from "express";
import {User} from "../models/user.model.ts"
import { admin } from "../FirebaseAdmin.ts";

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
      message: "Logged out (client should sign out of Firebase)",
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

// Register new user

export async function registerUserController(req: Request, res: Response): Promise<void> {
  try {
    const { uid, email, displayName } = req.body;

    if (!uid || !email || !displayName) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already registered" });
      return;
    }

    const newUser = new User({ uid, email, displayName });
    await newUser.save();

    res.json({ success: true, message: "Registration successful", data: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
}
