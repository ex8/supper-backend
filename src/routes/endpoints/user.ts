import Router from 'koa-router'
import { user } from '../../controllers'

const router = new Router({ prefix: '/users' })

const { fetchUsers, fetchUserById, createUser, updateUserById, deleteUserById } = user

router  
  .get('/', fetchUsers)
  .get('/:id', fetchUserById)
  .post('/', createUser)
  .put('/:id', updateUserById)
  .delete('/:id', deleteUserById)

export default router
