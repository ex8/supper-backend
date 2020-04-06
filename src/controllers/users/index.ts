import { Context } from 'koa'
import { compare } from 'bcryptjs'
import { IUser, User, Chef } from '../../models'
import { generateToken } from '../../helpers/models'

export default {
  async fetchUsers(ctx: Context): Promise<void> {
    const users: IUser[] = await User.find({})
    ctx.status = 200
    ctx.body = { success: true, users }
  },

  async fetchUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const user: IUser = await User.findById(id)
    if (!user) {
      return ctx.throw(400, { success: false, message: 'User not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async createUser(ctx: Context): Promise<void> {
    const { firstName, lastName, email, phone, password }: IUser = ctx.request.body

    const exists: boolean = await User.exists({ email })
    if (exists) {
      return ctx.throw(400, { success: false, message: 'Email already exists.' })
    }

    // User accounts cannot have same e-mail as a chef account
    const chefExists: boolean = await Chef.exists({ email })
    if (chefExists) {
      return ctx.throw(400, { success: false, message: 'Email already exists.' })
    }

    const user: IUser = await User.create({ firstName, lastName, email, phone, password })
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async updateUser(ctx: Context): Promise<void> {
    const { id } = ctx.state.user
    const { firstName, lastName, phone }: IUser = ctx.request.body
    const user: IUser = await User.findByIdAndUpdate(id, { firstName, lastName, phone }, { new: true })
    if (!user) {
      return ctx.throw(400, { success: false, message: 'User not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async loginUser(ctx: Context): Promise<void> {
    const { email, password }: IUser = ctx.request.body
    const user: IUser = await User.findOne({ email })
    if (!user) {
      return ctx.throw(400, { success: false, message: 'Incorrect email. Please try again.' })
    }
    const isMatch: boolean = await compare(password, user.password)
    if (isMatch) {
      const token: string = generateToken({ id: user.id })
      ctx.status = 200
      ctx.body = { success: true, token }
    } else {
      return ctx.throw(400, { success: false, message: 'Incorrect email or password. Please try again.' })
    }
  },
}
