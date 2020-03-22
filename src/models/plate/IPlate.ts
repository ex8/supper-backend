import { Document } from 'mongoose'

export interface IPlate extends Document {
  images: string[]
  title: string
  slug: string
  description: string
  price: number
  tags?: string[]
  ingredients?: string[]
  isPublic: boolean
}
