import jwt from 'jsonwebtoken'
import {ObjectInterface} from '../interfaces/common/object.interface'
import {Request, Response, NextFunction} from 'express'
import ApiResponse from '../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../messages/api/api-res.messages'
import {findUserByQuery} from '../utils/helper/query/user.query'
export class AuthMiddleware {
    private API_RESPONSE = new ApiResponse()
    public authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<ObjectInterface> => {
        try {
            const token = req.headers.token

            if (!token) {
                return this.API_RESPONSE.ErrorJsonResponse({
                    res,
                    code: API_RES_CODE.UNAUTHORIZED,
                    message: API_MESSAGE.UNAUTHORIZED,
                })
            }
            const user = jwt.verify(token, process.env.JWT_SECRET)

            if (!user) {
                return this.API_RESPONSE.ErrorJsonResponse({
                    res,
                    code: API_RES_CODE.UNAUTHORIZED,
                    message: API_MESSAGE.UNAUTHORIZED,
                })
            }

            const query = {
                email: user.email,
                _id: user.userId,
                type: user.type,
            }

            const checkUser = await findUserByQuery(query)

            if (!checkUser) {
                return this.API_RESPONSE.ErrorJsonResponse({
                    res,
                    code: API_RES_CODE.UNAUTHORIZED,
                    message: API_MESSAGE.UNAUTHORIZED,
                })
            }
            req['user'] = user
            next()
        } catch (error) {
            console.log(error)
            return this.API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNAUTHORIZED,
                message: API_MESSAGE.UNAUTHORIZED,
            })
        }
    }
}
