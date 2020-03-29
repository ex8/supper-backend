import { DefaultState, Context } from 'koa';
import Router from '@koa/router'
import { user } from '../../../controllers'
import { isObjectId } from '../../../helpers/routes';
import { isAuthenticated } from '../../../middlewares/passport';

const router = new Router<DefaultState, Context>({ prefix: '/users' })

const { fetchUsers, fetchUserById, createUser, updateUserById } = user

router
  .get('/', fetchUsers, isAuthenticated('admin'))
  .get('/:id', isAuthenticated('user', 'admin'), isObjectId, fetchUserById)
  .post('/', createUser)
  .put('/:id', isAuthenticated('user', 'admin'), isObjectId, updateUserById)

export default router
