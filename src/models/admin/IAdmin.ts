import { Document } from 'mongoose'

export interface IAdmin extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}
