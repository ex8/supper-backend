import '../../config/env'
import { Middleware } from 'koa'
import passport from 'koa-passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { IUser, User, IChef, Chef, IAdmin, Admin } from '../../models';

const secret: string = process.env.JWT_KEY

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
}

passport.use('user', new Strategy(opts, async ({ id }, done) => {
  const user: IUser = await User.findById(id)
  if (user) {
    return done(null, user)
  }
  return done(new Error('User not found'), null)
}))

passport.use('chef', new Strategy(opts, async ({ id }, done) => {
  const chef: IChef = await Chef.findById(id)
  if (chef) {
    return done(null, chef)
  }
  return done(new Error('Chef not found'), null)
}))

passport.use('admin', new Strategy(opts, async ({ id }, done) => {
  const admin: IAdmin = await Admin.findById(id)
  if (admin) {
    return done(null, admin)
  }
  return done(new Error('Admin not found'), null)
}))

export function isUserAuthenticated(): Middleware {
  return passport.authenticate('user')
}

export function isChefAuthenticated(): Middleware {
  return passport.authenticate('chef')
}

export function isAdminAuthenticated(): Middleware {
  return passport.authenticate('admin')
}

export default (): Middleware => {
  return passport.initialize()
}
