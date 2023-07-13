import {Router} from 'express'
import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {loginAdmin} from '../../../../controllers/app/auth/auth.controller'
import {loginCustomer} from '../../../../controllers/app/auth/auth.controller'

class AuthRoutes implements RouteInterface {
    public Router = Router()
    constructor() {
        this.Routes()
    }
    private Routes() {
        this.Router.post('/login-admin', loginAdmin)
        this.Router.post('/login-customer', loginCustomer)
    }
}

export default AuthRoutes
