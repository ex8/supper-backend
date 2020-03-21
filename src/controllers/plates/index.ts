import { Context } from 'koa';

import { IPlate, Plate } from '../../models'

export default {
  async fetchAllPublicPlates(ctx: Context): Promise<void> {
    const plates: IPlate[] = await Plate.find({ isPublic: true })
    ctx.status = 200
    ctx.body = { success: true, plates }
  }
}
