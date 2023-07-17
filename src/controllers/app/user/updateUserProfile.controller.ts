import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateProfile} from '../../../validations/app/v1/user/addUserProfile.validation'
const API_RESPONSE = new ApiResponse()
import {ProfileService} from '../../../services/app/user/userProfile.service'
const ProfileServices = new ProfileService()
import {Types} from 'mongoose'
const updateUserProfile = async (req: Request, res: Response) => {
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
        const result = await ProfileServices.updateProfile({_id: new Types.ObjectId(req.body.userId)}, req.body)
        if (!result || !result.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.PROFILE.UPDATE_ERROR,
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

export {updateUserProfile}
