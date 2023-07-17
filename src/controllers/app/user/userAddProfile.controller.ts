import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateProfile} from '../../../validations/app/v1/user/addUserProfile.validation'
const API_RESPONSE = new ApiResponse()
import {ProfileService} from '../../../services/app/user/userProfile.service'
const ProfileServices = new ProfileService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
const addUserProfile = async (req: Request, res: Response) => {
    try {
        const validateResult = validateProfile(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const result = await ProfileServices.addProfile(req.body)
        if (result && result.message == SERVICE_MESSAGE.PROFILE.EXIST_PROFILE) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.PROFILE.ALREADY_EXIST,
            })
        }
        if (result && result.message == SERVICE_MESSAGE.PROFILE.SUCCESS) {
            return API_RESPONSE.SuccessJsonResponse({
                res,
                code: API_RES_CODE.SUCCESS,
                data: {},
            })
        }
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.INVALID_INPUT,
            message: API_MESSAGE.PROFILE.ERROR,
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

export {addUserProfile}
