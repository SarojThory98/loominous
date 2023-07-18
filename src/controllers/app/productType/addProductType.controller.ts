import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateProductType} from '../../../validations/app/v1/product/addProductType.validation'
const API_RESPONSE = new ApiResponse()
import {ProductService} from '../../../services/app/product/product.service'
const ProductServices = new ProductService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
const addProductType = async (req: Request, res: Response) => {
    try {
        const validateResult = validateProductType(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const productTypeName = await ProductServices.existProductType(req.body)
        if (productTypeName && productTypeName.message == SERVICE_MESSAGE.PRODUCT.ALREADY_EXIST) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.PRODUCT_TYPE.PRODUCT_TYPE_ALREADY_EXIST,
            })
        }

        const result = await ProductServices.addProductType(req.body)
        if (result && result.message == SERVICE_MESSAGE.PRODUCT.ERROR) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: API_MESSAGE.PRODUCT_TYPE.PRODUCT_TYPE_NOT_ADDED,
                data: {},
            })
        }
        if (result && result.message == SERVICE_MESSAGE.PRODUCT.SUCCESS) {
            return API_RESPONSE.SuccessJsonResponse({
                res,
                code: API_RES_CODE.SUCCESS,
                data: {},
            })
        }
        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.BAD_REQUEST,
            message: API_MESSAGE.SUPPLIER.ERROR,
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

export {addProductType}
