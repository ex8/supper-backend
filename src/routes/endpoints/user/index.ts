import Router from '@koa/router'
import { user } from '../../../controllers'
import isValidObjectId from '../../../middlewares/isValidObjectId';

const router = new Router({ prefix: '/users' })

const { fetchUsers, fetchUserById, createUser, updateUserById, deleteUserById } = user

router
  .get('/', fetchUsers)
  .get('/:id', isValidObjectId(), fetchUserById)
  .post('/', createUser)
  .put('/:id', isValidObjectId(), updateUserById)
  .delete('/:id', isValidObjectId(), deleteUserById)

export default router
