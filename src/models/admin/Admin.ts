import { Schema, model, Model } from 'mongoose'
import validator from 'validator'
import { IAdmin } from './IAdmin'
import { encrypt } from '../../helpers/models'

const adminSchema = new Schema({
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
}, { timestamps: true })

adminSchema.pre<IAdmin>('save', async function (next) {
  if (!this.isModified('password')) return next()

  const encrypted: string = await encrypt(this.password)
  if (!encrypted) {
    return next(new Error('Could not encrypt password'))
  }

  this.password = encrypted
  next()
})

adminSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

const Admin: Model<IAdmin> = model<IAdmin>('Admin', adminSchema)

export { Admin }
