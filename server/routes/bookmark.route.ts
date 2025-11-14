import { Router } from 'express'
import {getBookmarks, addBookmark, removeBookmark} from '../controllers/bookmark.controller.ts'
import auth from '../middleware/auth.ts'

const bookmarkRouter = Router()

bookmarkRouter.get('/', auth, getBookmarks)
bookmarkRouter.post('/add', auth, addBookmark)
bookmarkRouter.post('/remove', auth, removeBookmark)

export default bookmarkRouter
