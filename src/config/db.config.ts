import dotenv from 'dotenv'
import mongoose, {ConnectOptions} from 'mongoose'

dotenv.config()
class InitDB {
    constructor() {
        const url = process.env.MONGO_URL
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB,
        }
        mongoose.set('debug', false) // put this in .env file under variable MONGO_DEBUG
        mongoose.set('strictQuery', false)
        mongoose
            .connect(url as string, options as ConnectOptions)
            .then(() => {
                console.log(`connected to mongodb`)
            })
            .catch(() => {
                console.log('mongo error occured')
            })
    }
}

export default InitDB
