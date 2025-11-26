import type { Request, Response } from "express";
import BookmarkModel from "../models/bookmark.model";

export async function getBookmarksController(req: Request, res: Response) {
  try {
    const bookmark = await BookmarkModel.findOne({ userId: req.user!.uid });
    const movieIds = bookmark?.movieIds ?? [];
    res.json({ success: true, data: movieIds });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function addBookmarkController(req: Request, res: Response) {
  const { movieId } = req.body;
  if (!movieId || typeof movieId !== "number") {
    return res.status(400).json({ message: "Invalid movieId", success: false });
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: req.user!.uid },
      { $addToSet: { movieIds: movieId } },
      { upsert: true, new: true }
    );
    res.json({ success: true, data: bookmark?.movieIds ?? [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function removeBookmarkController(req: Request, res: Response) {
  const { movieId } = req.body;
  if (!movieId || typeof movieId !== "number") {
    return res.status(400).json({ message: "Invalid movieId", success: false });
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: req.user!.uid },
      { $pull: { movieIds: movieId } },
      { new: true }
    );
    res.json({ success: true, data: bookmark?.movieIds ?? [] });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
}