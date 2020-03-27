import Router from '@koa/router'
import { chef } from '../../../controllers'

const router = new Router({ prefix: '/chefs' })

const { fetchChefs, fetchChefById, createChef, updateChefById, deleteChefById } = chef

router
  .get('/', fetchChefs)
  .get('/:id', fetchChefById)
  .post('/', createChef)
  .put('/:id', updateChefById)
  .delete('/:id', deleteChefById)

export default router
