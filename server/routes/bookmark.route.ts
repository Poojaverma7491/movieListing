import { Router } from "express";
import { getBookmarksController, addBookmarkController, removeBookmarkController } from "../controllers/bookmark.controller.ts";
import { requireAuth } from "../middleware/auth.ts";

const bookmarkRouter = Router();

bookmarkRouter.get("/", requireAuth, getBookmarksController);
bookmarkRouter.post("/add", requireAuth, addBookmarkController);
bookmarkRouter.post("/remove", requireAuth, removeBookmarkController);

export default bookmarkRouter;