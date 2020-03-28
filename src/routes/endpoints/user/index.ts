import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { user } from '../../../controllers'
import { isObjectId } from '../../../helpers/routes';

const router = new Router<DefaultState, Context>({ prefix: '/users' })

const { fetchUsers, fetchUserById, createUser, updateUserById, deleteUserById } = user

router
  .get('/', fetchUsers)
  .get('/:id', isObjectId, fetchUserById)
  .post('/', createUser)
  .put('/:id', isObjectId, updateUserById)
  .delete('/:id', isObjectId, deleteUserById)

export default router
