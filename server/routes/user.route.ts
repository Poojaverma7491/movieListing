import { Router } from "express";
import { requireAuth } from "../middleware/auth.ts";
import { getProfileController, googleLoginController, logoutController } from "../controllers/user.controller.ts";

const userRouter = Router();

userRouter.get("/", requireAuth, getProfileController);
userRouter.post("/logout", requireAuth, logoutController);
userRouter.post("/google-login", googleLoginController);

export default userRouter;