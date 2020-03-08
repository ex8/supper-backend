import Koa, { Context } from 'koa'

import connectDatabase from './db'
import middlewares from './middlewares'
import routes from './routes'

const app = new Koa()
const port = process.env.API_PORT || 5000

try {
  connectDatabase()
} catch (error) {
  throw new Error(`MongoDB connection unsuccessful: ${error}`)
}

app.use(middlewares())
app.use(routes())
app.use((ctx: Context) => ctx.status = 404)

app.listen(port, () => console.log(`Supper API running on ${port}...`))
