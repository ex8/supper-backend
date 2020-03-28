import { Document } from 'mongoose'

export interface IChef extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  address: {
    streetName: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  location: {
    type: string
    coordinates: number[]
  }
  profile: {
    username: string
    bio?: string
    social?: {
      facebook?: string
      twitter?: string
      instagram?: string
    }
  }
  isVerified: boolean
  isActive: boolean
}
