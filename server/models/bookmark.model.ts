import mongoose from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieIds: [{ type: Number, required: true }],
})

const BookmarkModel = mongoose.model('Bookmark', bookmarkSchema)
export default BookmarkModel
