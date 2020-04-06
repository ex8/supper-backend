import { Schema, model, Model } from 'mongoose'
import { IOrder } from './IOrder'

const orderItemSchema = new Schema({
  plate: {
    type: Schema.Types.ObjectId,
    ref: 'Plate',
    required: true,
  },
  quantity: { type: Number, required: true },
})

const orderSchema = new Schema({
  status: {
    type: String,
    enum: ['COMPLETED', 'ACCEPTED', 'IN PROGRESS', 'READY FOR PICKUP'],
    required: true,
  },
  notes: { type: String },
  items: [orderItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
})

const Order: Model<IOrder> = model<IOrder>('Order', orderSchema)

export { Order }
