import type { Request, Response } from 'express';
import BookmarkModel from '../models/bookmark.model.ts'

interface AuthenticatedRequest extends Request {
  userId?: string
}

export const getBookmarks = async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest
  try {
    const bookmark = await BookmarkModel.findOne({ userId: request.userId })
    const movieIds = bookmark?.movieIds ?? []
    res.json({ success: true, data: movieIds })
  } catch (err) {
    console.error('Error fetching bookmarks:', err)
    res.status(500).json({ success: false, message: 'Failed to fetch bookmarks' })
  }
}

export const addBookmark = async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest
  const { movieId } = req.body

  if (!movieId || typeof movieId !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid movieId' })
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: request.userId },
      { $addToSet: { movieIds: movieId } },
      { upsert: true, new: true }
    )
    const movieIds = bookmark?.movieIds ?? []
    res.json({ success: true, data: movieIds })
  } catch (err) {
    console.error('Error adding bookmark:', err)
    res.status(500).json({ success: false, message: 'Failed to add bookmark' })
  }
}

export const removeBookmark = async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest
  const { movieId } = req.body

  if (!movieId || typeof movieId !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid movieId' })
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: request.userId },
      { $pull: { movieIds: movieId } },
      { new: true }
    )
    const movieIds = bookmark?.movieIds ?? []
    res.json({ success: true, data: movieIds })
  } catch (err) {
    console.error('Error removing bookmark:', err)
    res.status(500).json({ success: false, message: 'Failed to remove bookmark' })
  }
}
