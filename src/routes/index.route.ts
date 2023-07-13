import * as express from 'express'
import AppV1Routes from './app/v1/index.app.route'

class ApiRoutes {
    public Router = express.Router()
    public AppV1Routes = new AppV1Routes()
    constructor() {
        this.ApiRoutes()
    }
    private ApiRoutes() {
        this.Router.use('/api', this.AppV1Routes.Router)
    }
}

export default ApiRoutes
