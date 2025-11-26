import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getProfileController, googleLoginController, logoutController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", requireAuth, getProfileController);
userRouter.post("/logout", requireAuth, logoutController);
userRouter.post("/google-login", googleLoginController);

export default userRouter;