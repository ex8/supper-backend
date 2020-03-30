import { Context, Next, Middleware } from 'koa';
import { isValidObjectId } from 'mongoose'

export async function isObjectId(ctx: Context, next: Next): Promise<Middleware> {
  const { id } = ctx.params
  if (!isValidObjectId(id)) {
    return ctx.throw(400, { success: false, message: 'Invalid id type.' })
  }
  await next()
}
