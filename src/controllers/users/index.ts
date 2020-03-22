import { Context } from 'koa';

import { IUser, User } from '../../models'

export default {
  async fetchUsers(ctx: Context): Promise<void> {
    const users: IUser[] = await User.find({})
    ctx.status = 200
    ctx.body = { success: true, users }
  },

  async fetchUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const user: IUser = await User.findById(id)
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async createUser(ctx: Context): Promise<void> {
    const { firstName, lastName, email, phone, password } = ctx.request.body
    const user: IUser = await User.create({ firstName, lastName, email, phone, password })
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async updateUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const { firstName, lastName, email, phone, password } = ctx.request.body
    const user: IUser = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone, password })
    ctx.status = 200
    ctx.body = { success: true, user }
  },

  async deleteUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const user: IUser = await User.findByIdAndDelete(id)
    ctx.status = 200
    ctx.body = { success: true, user }
  }
}
