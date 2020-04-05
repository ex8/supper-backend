import { Context } from 'koa'
import { IAdmin, Admin } from '../../models'

export default {
  async createAdmin(ctx: Context): Promise<void> {
    const { firstName, lastName, email, phone, password } = ctx.request.body
    const exists: boolean = await Admin.exists({ email })
    if (exists) {
      return ctx.throw(400, { success: false, message: 'Email already exists' })
    }
    const admin: IAdmin = await Admin.create({ firstName, lastName, email, phone, password })
    ctx.status = 200
    ctx.body = { success: true, admin }
  },

  async updateAdmin(ctx: Context): Promise<void> {
    const { id } = ctx.state.user
    const { firstName, lastName, email, phone }: IAdmin = ctx.request.body
    const admin: IAdmin = await Admin.findByIdAndUpdate(id, { firstName, lastName, email, phone }, { new: true})
    if (!admin) {
      return ctx.throw(400, { success: false, message: 'Admin not found' })
    }
    ctx.status = 200
    ctx.body = { success: true, admin }
  },
}
