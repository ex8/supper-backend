import { Context } from 'koa'
import { IPlate, Plate } from '../../models'
import { slugify } from '../../helpers/models'

export default {
  async fetchAllPublicPlates(ctx: Context): Promise<void> {
    const plates: IPlate[] = await Plate.find({ isPublic: true }).populate('chef')
    ctx.status = 200
    ctx.body = { success: true, plates }
  },

  async fetchPublicPlateBySlug(ctx: Context): Promise<void> {
    const { slug } = ctx.params
    const plate: IPlate = await Plate.findOne({ slug }).populate('chef')
    ctx.status = 200
    ctx.body = { success: true, plate }
  },

  async fetchPlates(ctx: Context): Promise<void> {
    const { id } = ctx.state.user
    const plates: IPlate[] = await Plate.find({ chef: id }).populate('chef')
    ctx.status = 200
    ctx.body = { success: true, plates }
  },

  async fetchPlateById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const { user } = ctx.state
    const plate: IPlate = await Plate.findOne({ id, chef: user.id }).populate('chef')
    if (!plate) {
      return ctx.throw(404, { success: false, message: 'Plate not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, plate }
  },

  async fetchPlateBySlug(ctx: Context): Promise<void> {
    const { slug } = ctx.params
    const { user } = ctx.state
    const plate: IPlate = await Plate.findOne({ slug, chef: user.id }).populate('chef')
    if (!plate) {
      return ctx.throw(404, { success: false, message: 'Plate not found.' })
    }
    ctx.status = 200
    ctx.body = { success: true, plate }
  },

  async createPlate(ctx: Context): Promise<void> {
    const { id } = ctx.state.user
    const { title, description, price, images, tags, ingredients }: IPlate = ctx.request.body
    const slug: string = slugify(title)
    const exists: boolean = await Plate.exists({ slug })
    if (exists) {
      return ctx.throw(400, { success: false, message: 'Title already exists.' })
    }
    const plate: IPlate = await Plate.create({ title, description, price, images, tags, ingredients, chef: id })
    ctx.status = 200
    ctx.body = { success: true, plate }
  },

  async updatePlateById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const { user } = ctx.state
    const { title, description, price, images, tags, ingredients }: IPlate = ctx.request.body
    const plate: IPlate = await Plate.findOneAndUpdate(
      { id, chef: user.id },
      { title, description, price, images, tags, ingredients },
      { new: true },
    )
    if (!plate) {
      return ctx.throw(400, { success: false, message: 'Plate not found' })
    }
    ctx.status = 200
    ctx.body = { success: true, plate }
  },

  async deletePlateById(ctx: Context): Promise<void> {
    const { id } = ctx.params
    const { user } = ctx.state
    const plate: IPlate = await Plate.findOneAndDelete({ id, chef: user.id })
    if (!plate) {
      return ctx.throw(404, { success: false, message: 'Plate not found' })
    }
    ctx.status = 200
    ctx.body = { success: true, plate }
  },
}
