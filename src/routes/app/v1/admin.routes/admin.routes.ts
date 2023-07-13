import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {Router} from 'express'
import {VerifyRole} from '../../../../middlewares/verifyRole'

class AdminRoutes implements RouteInterface {
    public Router = Router()
    public VerifyRole = new VerifyRole()

    constructor() {
        this.Routes()
    }
    private Routes() {
        // this.Router.post('/add/supplier', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, this.SupplierController.addSupplier)
    }
}

export default AdminRoutes
