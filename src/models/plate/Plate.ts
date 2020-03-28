import { Schema, model, Model } from 'mongoose';
import { IPlate } from './IPlate'

const plateSchema = new Schema({
  images: [String],
  title: { type: String, required: true, maxlength: 75 },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  tags: [String],
  ingredients: [String],
  isPublic: { type: Boolean, default: false },
}, { timestamps: true })

plateSchema.pre<IPlate>('save', function(next) {
  if (this.isModified('title')) {
    const slugified = this.title.toLowerCase().replace(' ', '-')
    this.slug = slugified
  }
  return next()
})

const Plate: Model<IPlate> = model<IPlate>('Plate', plateSchema)

export { Plate }
