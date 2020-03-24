import { Context } from 'koa'

import { IChef, Chef } from '../../models'

export default {
  async fetchChefs(ctx: Context): Promise<void> {
    const chefs: IChef[] = await Chef.find({})
    ctx.status = 200
    ctx.body = { success: true, chefs }
  },

  async fetchChefById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const chef: IChef = await Chef.findById(id)
    if (!chef) {
      return ctx.throw(404, { success: false, message: 'Chef not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, chef }
  },

  async createChef(ctx: Context): Promise<void> {
    const { firstName, lastName, email, password, address, location, profile } = ctx.request.body
    const { username } = profile
    const exists: IChef = await Chef.findOne({ $or: [{ email }, { username }] })
    if (exists) {
      return ctx.throw(400, { success: false, message: 'Email or username already exists.' })
    }
    const chef: IChef = await Chef.create({ firstName, lastName, email, password, address, location, profile })
    ctx.status = 200
    ctx.body = { success: true, chef }
  },

  async updateChefById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const { firstName, lastName, email, password, address, location, profile } = ctx.request.body
    const chef: IChef = await Chef.findByIdAndUpdate(id, { firstName, lastName, email, password, address, location, profile })
    if (!chef) {
      return ctx.throw(404, { success: false, message: 'Chef not found.' })
    }
  },

  async deleteChefById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const chef: IChef = await Chef.findByIdAndDelete(id)
    if (!chef) {
      return ctx.throw(404, { success: false, message: 'Chef not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, chef }
  },
}
