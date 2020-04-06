import { Schema, model, Model } from 'mongoose'
import { IPlate } from './IPlate'
import { slugify } from '../../helpers/models'

const plateSchema = new Schema({
  title: { type: String, required: true, maxlength: 75 },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  tags: [String],
  ingredients: [String],
  isPublic: { type: Boolean, default: false },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  }
}, { timestamps: true })

plateSchema.pre<IPlate>('save', function(next) {
  if (this.isModified('title')) {
    const slugified = slugify(this.title)
    this.slug = slugified
  }
  return next()
})

const Plate: Model<IPlate> = model<IPlate>('Plate', plateSchema)

export { Plate }
