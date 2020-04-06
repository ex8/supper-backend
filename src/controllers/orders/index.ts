import { Context } from 'koa'
import { IOrder, Order } from '../../models'

export default {
  async createOrder(ctx: Context): Promise<void> {
    const { status, notes, items, chef }: IOrder = ctx.request.body
    const { id } = ctx.state.user
    const order: IOrder = await Order.create({ status, notes, items, chef, user: id })
    ctx.status = 200
    ctx.body = { success: true, order }
  },
}
