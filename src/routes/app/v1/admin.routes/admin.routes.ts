import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {Router} from 'express'
import {VerifyRole} from '../../../../middlewares/verifyRole'
import {getUserList, getUserProfile} from '../../../../controllers/app/user/userList.controller'
import {AuthMiddleware} from '../../../../middlewares/verifyToken'
import {updateUserProfile} from '../../../../controllers/app/user/updateUserProfile.controller'

class AdminRoutes implements RouteInterface {
    public Router = Router()
    public VerifyRole = new VerifyRole()
    public AuthMiddleware = new AuthMiddleware()

    constructor() {
        this.Routes()
    }
    private Routes() {
        this.Router.get('/admin/user-list', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getUserList)
        this.Router.get('/admin/user-profile/:id', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getUserProfile)
        this.Router.patch('/admin/user-update-profile', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, updateUserProfile)
    }
}

export default AdminRoutes
