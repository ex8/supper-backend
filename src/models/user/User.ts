import { Schema, model, Model } from 'mongoose'
import validator from 'validator'
import { IUser } from './IUser';
import { encrypt } from '../../helpers/models'
import { sign } from 'jsonwebtoken';
import { secret } from '../../middlewares/passport';

const userSchema = new Schema({
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
  isVerified: { type: Boolean, default: false, required: true },
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

userSchema.virtual('fullName').get(function (): string {
  return `${this.firstName} ${this.lastName}`
})

userSchema.methods.generateJwt = function(): string {
  const payload: Record<string, string> = { id: this.id }
  return sign(payload, secret, { expiresIn: '5h' })
}

const User: Model<IUser> = model<IUser>('User', userSchema)

export { User }
