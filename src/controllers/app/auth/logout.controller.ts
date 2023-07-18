import jwt from 'jsonwebtoken'
import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
const API_RESPONSE = new ApiResponse()
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'

const logoutUser = async (req, res) => {
    try {
        const token = jwt.sign({user: req.userId.user._id}, process.env.JWT_SECRET, {expiresIn: 0})
        if (token) {
            return API_RESPONSE.SuccessJsonResponse({
                res,
                code: API_RES_CODE.SUCCESS,
                data: {
                    token: token,
                },
            })
        }
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.ERROR,
            message: API_MESSAGE.AUTH.LOGOUT_ERROR,
        })
    } catch (err) {
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.ERROR,
            message: err,
        })
    }
}

export {logoutUser}
