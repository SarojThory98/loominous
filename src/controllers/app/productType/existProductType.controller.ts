import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {ProductService} from '../../../services/app/product/product.service'
const ProductServices = new ProductService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'

const isExistProductTypeName = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.PRODUCT_TYPE.PRODUCT_TYPE_NAME_IS_REQUIRED},
            })
        }
        const result = await ProductServices.existProductType(req.body)
        if (result && result.message == SERVICE_MESSAGE.PRODUCT.ALREADY_EXIST) {
            return API_RESPONSE.SuccessJsonResponse({
                res,
                code: API_RES_CODE.SUCCESS,
                message: API_MESSAGE.PRODUCT_TYPE.PRODUCT_TYPE_ALREADY_EXIST,
            })
        }

        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.INVALID_INPUT,
            message: API_MESSAGE.PRODUCT_TYPE.NO_PRODUCT_TYPE_FOUND,
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

export {isExistProductTypeName}
