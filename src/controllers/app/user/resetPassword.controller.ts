import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validatePassword} from '../../../validations/app/v1/user/resetPassword.validation.'
const API_RESPONSE = new ApiResponse()
import {UserService} from '../../../services/app/user/index.user.service'
const UserServices = new UserService()
import {Types} from 'mongoose'
import bcrypt from 'bcrypt'
import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'

const resetPassword = async (req: Request, res: Response) => {
    try {
        const validateResult = validatePassword(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const result = await UserServices.updateSignupStatus({_id: new Types.ObjectId(req['user'].userId)}, {[USER_MODEL_KEYS.PASSWORD]: hashedPassword})
        if (!result || !result.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.PASSWORD.ERROR,
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

export {resetPassword}
