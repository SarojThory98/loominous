import jwt from 'jsonwebtoken'
import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
const API_RESPONSE = new ApiResponse()
import bcrypt from 'bcrypt'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {UserAuthService} from '../../../services/app/auth/auth.service'
const loginService = new UserAuthService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'

import {validateUserLogin} from '../../../validations/app/v1/auth/auth.validation'

const loginAdmin = async (req: Request, res: Response) => {
    try {
        const validateResult = await validateUserLogin(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }

        const result = await loginService.loginUser(req.body)
        if (result.message == SERVICE_MESSAGE.LOGIN.USER_NOT_EXIST) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.AUTH.EMAIL_NOT_EXISTS,
            })
        }
        if (result.status) {
            bcrypt.compare(req.body.password, result.message.password, (err, result) => {
                if (result) {
                    const tokenConstant = {
                        userId: result._id,
                        email: result.email,
                        type: result.type,
                    }

                    const token = jwt.sign(tokenConstant, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRY,
                    })
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
                    code: API_RES_CODE.NOT_FOUND,
                    message: API_MESSAGE.AUTH.INVALID_CREDENTIALS,
                })
            })
        }
    } catch (error) {
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.SERVER_ERROR,
            message: API_MESSAGE.SERVER_ERROR,
            data: error,
        })
    }
}
const loginCustomer = async (req: Request, res: Response) => {
    try {
        const validateResult = await validateUserLogin(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }

        const result = await loginService.loginUser(req.body)
        if (result.message == SERVICE_MESSAGE.LOGIN.USER_NOT_EXIST) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.AUTH.EMAIL_NOT_EXISTS,
            })
        }
        if (result.status) {
            bcrypt.compare(req.body.password, result.message.password, (err, result) => {
                if (err) {
                    return API_RESPONSE.ErrorJsonResponse({
                        res,
                        code: API_RES_CODE.NOT_FOUND,
                        message: API_MESSAGE.AUTH.INVALID_CREDENTIALS,
                    })
                }
            })
        }
        if (!result.message.isProfileComplete) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                message: API_MESSAGE.AUTH.PROFILE_INCOMPLETE,
                code: API_RES_CODE.NOT_ALLOWED,
                data: {
                    isProfileComplete: false,
                },
            })
        }

        const tokenConstant = {
            userId: result._id,
            email: result.email,
            type: result.type,
        }

        const token = jwt.sign(tokenConstant, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        })
        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                token: token,
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
export {loginAdmin, loginCustomer}
