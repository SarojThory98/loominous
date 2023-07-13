import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateUser} from '../../../validations/app/v1/user/userSignup.validation'
const API_RESPONSE = new ApiResponse()
import {UserService} from '../../../services/app/user/index.user.service'
const UserServices = new UserService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
const signupUser = async (req: Request, res: Response) => {
    try {
        const validateResult = validateUser(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const result = await UserServices.registerUser(req.body)
        if (result.message == SERVICE_MESSAGE.SIGNUP.EXIST_EMAIL) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.SIGNUP.EMAIL,
            })
        }
        if (result.message == SERVICE_MESSAGE.SIGNUP.EXIST_EMAIL_NOT_VERIFIED) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.SIGNUP.NOT_VERIFIED,
            })
        }
        if (result.message == SERVICE_MESSAGE.SIGNUP.INCOMPLETE_PROFILE) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.SIGNUP.INCOMPLETE_PROFILE,
            })
        }
        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {},
        })
    } catch (error) {
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.SERVER_ERROR,
            message: API_MESSAGE.SERVER_ERROR,
            data: error,
        })
    }
}

export {signupUser}
