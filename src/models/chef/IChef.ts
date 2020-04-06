import { Document } from 'mongoose'
import { IReview } from '../reviews'

export interface IChef extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  address: IAddress
  location: ILocation
  profile: IProfile
  isVerified: boolean
  isActive: boolean
  rating: number
  reviews: IReview[]
  fullName: string
  fullAddress: string
  generateJwt(): string
}

export interface IAddress {
  streetName: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface ILocation {
  type: string
  coordinates: number[]
}

export interface IProfile {
  username: string
  bio?: string
  social?: ISocial
}

export interface ISocial {
  facebook?: string
  twitter?: string
  instagram?: string
}
