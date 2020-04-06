import { Schema, model, Model } from 'mongoose'
import validator from 'validator'
import { IChef } from './IChef'
import { encrypt } from '../../helpers/models'
import { sign } from 'jsonwebtoken'
import { secret } from '../../middlewares/passport'
import { reviewSchema } from '../review'

const chefSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid e-mail address'],
  },
  phone: {
    type: String,
    required: true,
    validate: [validator.isMobilePhone, 'Invalid phone number'],
  },
  password: { type: String, required: true },
  address: {
    streetName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: { type: [Number], required: true },
  },
  profile: {
    username: { type: String, unique: true, required: true },
    bio: { type: String },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
  },
  isVerified: { type: Boolean, default: false, required: true },
  isActive: { type: Boolean, default: true, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [reviewSchema],
}, { timestamps: true })

chefSchema.pre<IChef>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const encrypted: string = await encrypt(this.password)
  if (!encrypted) {
    return next(new Error('Could not encrypt password'))
  }

  this.password = encrypted
  next()
})

chefSchema.virtual('fullName').get(function (): string {
  return `${this.firstName} ${this.lastName}`
})

chefSchema.virtual('fullAddress').get(function (): string {
  return `${this.streetName}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`
})

chefSchema.methods.generateJwt = function(): string {
  const payload: Record<string, string> = { id: this.id }
  return sign(payload, secret, { expiresIn: '5h' })
}

const Chef: Model<IChef> = model<IChef>('Chef', chefSchema)

export { Chef }
