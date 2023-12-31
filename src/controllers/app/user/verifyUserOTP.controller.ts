import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateOTP} from '../../../validations/app/v1/user/userOTP.validation'
const API_RESPONSE = new ApiResponse()
import {UserService} from '../../../services/app/user/index.user.service'
import {Types} from 'mongoose'
import {OTP_MODEL_KEYS} from '../../../constants/models/otp/otp.model.key'
import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'

const userOTP = new UserService()
const verifyOTP = async (req: Request, res: Response) => {
    try {
        const validateResult = validateOTP(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const result = await userOTP.verifyUserOTP({[OTP_MODEL_KEYS.USERID]: new Types.ObjectId(req.body.userId)})
        if (!result.otp) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.OTP.OTP_EXPIRED,
            })
        }
        if (result.otp !== req.body.otp) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.OTP.INVALID_OTP,
            })
        }
        const updatedStatus = await userOTP.updateSignupStatus({_id: new Types.ObjectId(req.body.userId)}, {[USER_MODEL_KEYS.IS_VERIFIED]: 1})
        if (!updatedStatus) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.USER.VERIFICATION_FAILED,
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

export {verifyOTP}
