import type { Request, Response, NextFunction } from "express";
import { admin } from "../FirebaseAdmin";
import { User } from "../models/user.model";

import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
        providerId?: string;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name: displayName, picture: photoURL } = decoded;
    const providerId = decoded.firebase?.sign_in_provider;
    const userDoc = await User.findOneAndUpdate(
      { uid },
      { $set: { email, displayName, photoURL, providerId } },
      { new: true, upsert: true }
    );

    req.user = {
      uid,
      email: userDoc.email,
      displayName: userDoc.displayName,
      photoURL: userDoc.photoURL,
      providerId: userDoc.providerId,
    };

    return next();
  } catch {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
