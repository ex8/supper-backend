import { Document } from 'mongoose'
import { IChef } from '../chef';

export interface IPlate extends Document {
  title: string
  slug: string
  description: string
  price: number
  images?: string[]
  tags?: string[]
  ingredients?: string[]
  isPublic: boolean
  chef: IChef
}
