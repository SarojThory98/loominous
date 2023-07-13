import {RouteInterface} from '../../../interfaces/api/router.interface'
import {Router} from 'express'
import AdminRoutes from './admin.routes/admin.routes'
import UserRoutes from './user.routes/user.routes'

class AppV1Routes implements RouteInterface {
    public Router = Router()
    public AdminRoutes = new AdminRoutes()
    public UserRoutes = new UserRoutes()

    public Path = '/app/v1'
    constructor() {
        this.AppV1Routes()
    }
    private AppV1Routes() {
        this.Router.use(this.Path, this.UserRoutes.Router)
    }
}

export default AppV1Routes
