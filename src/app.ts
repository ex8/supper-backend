import './config/env'
import Koa from 'koa'
import { connectDatabase } from './config'
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

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Supper API running on ${port}...`))
