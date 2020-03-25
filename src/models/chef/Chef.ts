import { Schema, model, Model } from 'mongoose'
import { IChef } from './IChef'
import { encrypt } from '../../helpers/models'

const chefSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
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
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: { type: [Number, Number], required: true },
  },
  profile: {
    username: { type: String, unique: true, required: true },
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

  const encrypted: string = await encrypt(this.password)
  if (!encrypted) {
    return next(new Error('Could not encrypt password'))
  }

  this.password = encrypted
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
