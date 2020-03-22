import { Schema, model, Model } from 'mongoose'
import { genSalt, hash } from 'bcryptjs'
import { IUser } from './IUser';

const userSchema = new Schema({
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  phone: { type: String, required: true, },
  password: { type: String, required: true, },
}, { timestamps: true })

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password')) return next();
  genSalt(10)
    .then((salt: string) => {
      hash(this.password, salt)
        .then((hashed: string) => {
          this.password = hashed
          next()
        })
        .catch((err: Error) => next(err))
    })
    .catch((err: Error) => next(err))
})

const User: Model<IUser> = model<IUser>('User', userSchema)

export { User }
