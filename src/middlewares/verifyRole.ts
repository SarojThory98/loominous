import ApiResponse from '../utils/api/api-respnse-handler.utils'
import {ObjectInterface} from '../interfaces/common/object.interface'
import {USER_TYPE_ENUM} from '../constants/models/Enums/userEnum'
import {API_RES_CODE} from '../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../messages/api/api-res.messages'
import {Request, Response, NextFunction} from 'express'
export class VerifyRole {
    private API_RESPONSE = new ApiResponse()
    public verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<ObjectInterface> => {
        try {
            if (req['user'].type !== USER_TYPE_ENUM.ADMIN) {
                return this.API_RESPONSE.ErrorJsonResponse({
                    res,
                    code: API_RES_CODE.UNAUTHORIZED,
                    message: API_MESSAGE.UNAUTHORIZED,
                })
            }

            next()
        } catch (error) {
            return error
        }
    }
    public verifyCustomer = async (req: Request, res: Response, next: NextFunction): Promise<ObjectInterface> => {
        try {
            if (req['user'].type !== USER_TYPE_ENUM.CUSTOMER) {
                return this.API_RESPONSE.ErrorJsonResponse({
                    res,
                    code: API_RES_CODE.UNAUTHORIZED,
                    message: API_MESSAGE.UNAUTHORIZED,
                })
            }

            next()
        } catch (error) {
            return error
        }
    }
}
