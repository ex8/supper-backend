import '../../config/env'
import { Middleware, Context, Next } from 'koa'
import { use, authenticate, initialize } from 'koa-passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser, User, IChef, Chef, IAdmin, Admin } from '../../models';

export const secret: string = process.env.JWT_KEY

export type AuthorizedRoles = 'user' | 'chef' | 'admin'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}

use('user', new Strategy(opts, async ({ id }, done) => {
  const user: IUser = await User.findById(id)
  if (user) {
    return done(null, user)
  }
  done(null, false)
}))

use('chef', new Strategy(opts, async ({ id }, done) => {
  const chef: IChef = await Chef.findById(id)
  if (chef) {
    return done(null, chef)
  }
  done(null, false)
}))

use('admin', new Strategy(opts, async ({ id }, done) => {
  const admin: IAdmin = await Admin.findById(id)
  if (admin) {
    return done(null, admin)
  }
  done(null, false)
}))

export function isAuthenticated(...types: AuthorizedRoles[]): Middleware {
  return (ctx: Context, next: Next) => {
    return authenticate(types, { session: false }, async (err, user) => {
      if (err || !user) {
        return ctx.throw(401, { success: false, message: 'Unauthorized' })
      }
      await next()
    })(ctx, next)
  }
}

export default (): Middleware => {
  return initialize()
}
