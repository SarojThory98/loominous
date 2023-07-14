import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {Router} from 'express'
import {VerifyRole} from '../../../../middlewares/verifyRole'
import {signupUser} from '../../../../controllers/app/user/userSignup.controller'
import {verifyOTP} from '../../../../controllers/app/user/verifyUserOTP.controller'

class UserRoutes implements RouteInterface {
    public Router = Router()
    public VerifyRole = new VerifyRole()

    constructor() {
        this.Routes()
    }
    private Routes() {
        this.Router.post('/user-signup', signupUser)
        this.Router.post('/user-otp-varify', verifyOTP)
    }
}

export default UserRoutes
