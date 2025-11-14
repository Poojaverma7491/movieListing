import type { Request, Response } from 'express';
import BookmarkModel from '../models/bookmark.model.ts'

interface AuthenticatedRequest extends Request {
  userId?: string
}

export const getBookmarks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const bookmark = await BookmarkModel.findOne({ userId: req.userId })
    const movieIds = bookmark?.movieIds ?? []
    res.json({ 
      success: true, 
      data: movieIds 
    })
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to fetch bookmarks',
      success: false 
    })
  }
}

export const addBookmark = async (req: AuthenticatedRequest, res: Response) => {
  const { movieId } = req.body

  if (!movieId || typeof movieId !== 'number') {
    return res.status(400).json({ 
      message: 'Invalid movieId',
      success: false 
    })
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: req.userId },
      { $addToSet: { movieIds: movieId } },
      { upsert: true, new: true }
    )
    const movieIds = bookmark?.movieIds ?? []
    res.json({ success: true, data: movieIds })
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to add bookmark',
      success: false 
    })
  }
}

export const removeBookmark = async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest
  const { movieId } = req.body

  if (!movieId || typeof movieId !== 'number') {
    return res.status(400).json({ 
      message: 'Invalid movieId',
      success: false 
    })
  }

  try {
    const bookmark = await BookmarkModel.findOneAndUpdate(
      { userId: request.userId },
      { $pull: { movieIds: movieId } },
      { new: true }
    )
    const movieIds = bookmark?.movieIds ?? []
    res.json({
       success: true, 
       data: movieIds 
      })
  } catch (err) {
    res.status(500).json({ 
      message: 'Failed to remove bookmark',
      success: false 
    })
  }
}
