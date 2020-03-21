import { Context } from 'koa';

import { IUser, User } from '../../models'

export default {
  async fetchUsers(ctx: Context): Promise<void> {
    const users: IUser[] = await User.find({})
    ctx.status = 200
    ctx.body = { success: true, users }
  }
}
