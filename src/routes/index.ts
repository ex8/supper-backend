import Router from 'koa-router'
import searchRouter from './endpoints/search'

const routerDefinitions = [
  searchRouter,
]

export default function routes() {
  const apiRouter = new Router({ prefix: '/api' })

  for (const router of routerDefinitions) {
    apiRouter.use(router.routes())
    apiRouter.use(router.allowedMethods())
  }
  
  return apiRouter.routes()
}
