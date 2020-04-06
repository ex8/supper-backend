import { Context } from 'koa'
import { compare } from 'bcryptjs'
import { IChef, Chef } from '../../models'
import { generateToken } from '../../helpers/models'

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
    const { firstName, lastName, email, phone, password, address, location, profile }: IChef = ctx.request.body
    const { username } = profile
    const exists: boolean = await Chef.exists({ $or: [{ email }, { profile: { username } }] })
    if (exists) {
      return ctx.throw(400, { success: false, message: 'Email or username already exists.' })
    }
    const chef: IChef = await Chef.create({ firstName, lastName, email, phone, password, address, location, profile })
    ctx.status = 200
    ctx.body = { success: true, chef }
  },

  async updateChef(ctx: Context): Promise<void> {
    const { id } = ctx.state.user
    const { firstName, lastName, phone, address, location }: IChef = ctx.request.body
    const chef: IChef = await Chef.findByIdAndUpdate(id,
      { firstName, lastName, phone, address, location },
      { new: true },
    )
    if (!chef) {
      return ctx.throw(400, { success: false, message: 'Chef not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, chef }
  },

  async loginChef(ctx: Context): Promise<void> {
    const { email, password } = ctx.request.body
    const chef: IChef = await Chef.findOne({ email })
    if (!chef) {
      return ctx.throw(400, { success: false, message: 'Incorrect email. Please try again.' })
    }
    const isMatch: boolean = await compare(password, chef.password)
    if (isMatch) {
      const token: string = generateToken({ id: chef.id })
      ctx.status = 200
      ctx.body = { success: true, token }
    } else {
      return ctx.throw(400, { success: false, message: 'Incorrect email or password. Please try again.' })
    }
  },
}
