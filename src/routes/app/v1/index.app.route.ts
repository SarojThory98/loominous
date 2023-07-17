import {RouteInterface} from '../../../interfaces/api/router.interface'
import {Router} from 'express'
import AdminRoutes from './admin.routes/admin.routes'
import UserRoutes from './user.routes/user.routes'
import AuthRoutes from './auth/auth.route'

class AppV1Routes implements RouteInterface {
    public Router = Router()
    public AdminRoutes = new AdminRoutes()
    public UserRoutes = new UserRoutes()
    public AuthRoutes = new AuthRoutes()

    public Path = '/app/v1'
    constructor() {
        this.AppV1Routes()
    }
    private AppV1Routes() {
        this.Router.use(this.Path, this.UserRoutes.Router)
        this.Router.use(this.Path, this.AdminRoutes.Router)
        this.Router.use(this.Path, this.AuthRoutes.Router)
    }
}

export default AppV1Routes
