import { Document } from 'mongoose'
import { IPlate } from '../plate'
import { IUser } from '../user'
import { IChef } from '../chef'

export type orderTypes = 'COMPLETED' | 'ACCEPTED' | 'IN PROGRESS' | 'READY FOR PICKUP'

export interface IOrder extends Document {
  status: orderTypes
  notes: string
  items: IOrderItem[]
  user: IUser
  chef: IChef
}

export interface IOrderItem {
  plate: IPlate
  quantity: number
}
