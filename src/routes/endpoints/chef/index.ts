import Router from '@koa/router'
import { chef } from '../../../controllers'
import isValidObjectId from '../../../middlewares/isValidObjectId';

const router = new Router({ prefix: '/chefs' })

const { fetchChefs, fetchChefById, createChef, updateChefById, deleteChefById } = chef

router
  .get('/', fetchChefs)
  .get('/:id', isValidObjectId(), fetchChefById)
  .post('/', createChef)
  .put('/:id', isValidObjectId(), updateChefById)
  .delete('/:id', isValidObjectId(), deleteChefById)

export default router
