import { Context, Next } from 'koa';
import { isValidObjectId } from 'mongoose'

export default () => (ctx: Context, next: Next) => {
  const { id } = ctx.params
  if (!isValidObjectId(id)) {
    // tslint:disable-next-line: no-console
    console.log('invalid af')
    return ctx.throw(400, { success: false, message: 'Invalid id type.' })
  }
  // tslint:disable-next-line: no-console
  console.log('valid af')
  return next()
}
