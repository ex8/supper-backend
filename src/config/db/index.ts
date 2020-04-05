import '../env'
import { connect } from 'mongoose'

const dbUrl: string = process.env.MONGODB_URL

export default async function connectDataBase(): Promise<void> {
  await connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}
