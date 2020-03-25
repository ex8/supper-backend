import { Schema, model, Model } from 'mongoose'
import { IUser } from './IUser';
import { encrypt } from '../../helpers/models'

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const encrypted: string = await encrypt(this.password)
  if (!encrypted) {
    return next(new Error('Could not encrypt password'))
  }

  this.password = encrypted
  next()
})

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

const User: Model<IUser> = model<IUser>('User', userSchema)

export { User }
