import { Schema, model, Model } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'
import { IChef } from './IChef'

const chefSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
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
      required: true,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: { type: [Number, Number], required: true },
  },
  profile: {
    username: { type: String, required: true },
    bio: { type: String },
    social: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
  }
})

chefSchema.pre<IChef>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Salt
  const salt: string = await genSalt(15)
  if (!salt) return next(new Error('Could not generate salt'))

  // Hash
  const hashed: string = await hash(this.password, salt)
  if (!hashed) return next(new Error('Could not generate hash'))

  this.password = hashed
  next()
})

chefSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

chefSchema.virtual('fullAddress').get(function () {
  return `${this.streetName}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`
})

const Chef: Model<IChef> = model<IChef>('Chef', chefSchema)

export { Chef }
