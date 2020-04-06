import { IUser } from '../user'
import { IPlate } from '../plate'

export interface IReview {
  rating: number
  message: string
  plate: IPlate
  user: IUser
}
