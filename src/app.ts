import ApiRoutes from './routes/index.route'
import {logger} from './utils/logger/logger.utils'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

class App {
    public app: express.Application
    private port: string | number
    private env: string
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 2000
        this.env = process.env.NODE_ENV || 'development'
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.get('/', (req, res) => {
            res.send('🌳 Hello World..!! 🌳')
        })
        this.app.use(new ApiRoutes().Router)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`)
        })
    }
}

export default App
