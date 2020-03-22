import { Context, Next } from 'koa';

export default () => async (ctx: Context, next: Next) => {
  try {
    await next()
  }
  catch (err) {
    const { statusCode, success, message } = err
    ctx.type = 'json'
    ctx.status = statusCode || 500
    ctx.body = { success, message }
  }
}
