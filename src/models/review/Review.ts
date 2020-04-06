import { Schema } from 'mongoose'

export const reviewSchema = new Schema({
  rating: { type: Number, min: 0, max: 5, required: true },
  message: { type: String, required: true },
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true })
