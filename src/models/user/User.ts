import { Schema, model, Model } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'
import { IUser } from './IUser';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Salt
  const salt: string = await genSalt(15)
  if (!salt) {
    return next(new Error('Could not generate salt'))
  }

  // Hash
  const hashed: string = await hash(this.password, salt)
  if (!hashed) {
    return next(new Error('Could not generate hash'))
  }

  this.password = hashed
  next()
})

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

const User: Model<IUser> = model<IUser>('User', userSchema)

export { User }
