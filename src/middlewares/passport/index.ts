import '../../config/env'
import { Middleware } from 'koa'
import { use, authenticate, initialize } from 'koa-passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser, User, IChef, Chef, IAdmin, Admin } from '../../models';

export const secret: string = process.env.JWT_KEY

export type AuthenticationRoles = 'user' | 'chef' | 'admin'

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

export function isAuthenticated(...types: AuthenticationRoles[]): Middleware {
  return authenticate(types, { session: false, failWithError: true })
}

export default (): Middleware => {
  return initialize()
}
