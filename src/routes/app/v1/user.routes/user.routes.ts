import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {Router} from 'express'
import {VerifyRole} from '../../../../middlewares/verifyRole'
import {signupUser} from '../../../../controllers/app/user/userSignup.controller'
import {verifyOTP} from '../../../../controllers/app/user/verifyUserOTP.controller'
import {addUserProfile} from '../../../../controllers/app/user/userAddProfile.controller'
import {updateUserProfile} from '../../../../controllers/app/user/updateUserProfile.controller'
import {resetPassword} from '../../../../controllers/app/user/resetPassword.controller'
import {AuthMiddleware} from '../../../../middlewares/verifyToken'

class UserRoutes implements RouteInterface {
    public Router = Router()
    public VerifyRole = new VerifyRole()
    public AuthMiddleware = new AuthMiddleware()

    constructor() {
        this.Routes()
    }
    private Routes() {
        this.Router.post('/user-signup', signupUser)
        this.Router.post('/user-otp-varify', verifyOTP)
        this.Router.post('/user-add-profile', addUserProfile)
        this.Router.patch('/user-update-profile', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyCustomer, updateUserProfile)
        this.Router.post('/user-reset-password', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyCustomer, resetPassword)
    }
}

export default UserRoutes
