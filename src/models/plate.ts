import { Schema, model } from 'mongoose';

interface IPlate {
  images: string[]
  title: string
  slug: string
  description: string
  price: number
  tags?: string[]
  ingredients?: string[]
  isPublic: boolean
}

const plateSchema = new Schema({
  images: [String],
  title: { type: String, required: true, },
  slug: { type: String, required: true, unique: true, },
  description: { type: String, required: true, },
  price: { type: Number, required: true, },
  tags: [String],
  ingredients: [String],
  isPublic: { type: Boolean, default: false, },
}, { timestamps: true })

plateSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    const slugified = this.title.toLowerCase().replace(' ', '-')
    this.slug = slugified
  }
  return next()
})

const Plate = model('Plate', plateSchema)

export {
  IPlate,
  Plate,
}
