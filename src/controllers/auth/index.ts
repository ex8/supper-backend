import { Context } from 'koa'

export default {
  async me(ctx: Context): Promise<void> {
    ctx.status = 200
    ctx.body = { me: ctx.state.user }
  },
}
