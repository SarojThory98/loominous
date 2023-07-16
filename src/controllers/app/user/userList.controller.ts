import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {UserService} from '../../../services/app/user/index.user.service'
import {ProfileService} from '../../../services/app/user/userProfile.service'
const ProfileServices = new ProfileService()
const UserServices = new UserService()
import {PAGINATION} from '../../../constants/models/pagination/pagination'
import {Types} from 'mongoose'
const getUserList = async (req: Request, res: Response) => {
    try {
        const {pageNo = PAGINATION.PAGE, pageLimit = PAGINATION.LIMIT} = req.query
        const response = await UserServices.userList(pageNo, pageLimit)

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NO_CONTENT,
                message: API_MESSAGE.USER.NO_USER_FOUND,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                count: response.message.count,
                usersData: response.message.data,
            },
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

const getUserProfile = async (req: Request, res: Response) => {
    try {
        const response = await ProfileServices.userProfile(new Types.ObjectId(req.params.id))

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NO_CONTENT,
                message: API_MESSAGE.USER.NO_USER_FOUND,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: response.message,
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

export {getUserList, getUserProfile}
