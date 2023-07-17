import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateProductType} from '../../../validations/app/v1/product/addProductType.validation'
const API_RESPONSE = new ApiResponse()
import {ProductService} from '../../../services/app/product/product.service'
const ProductServices = new ProductService()
import {Types} from 'mongoose'
const updateProductType = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || req.params.id == ':id') {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.PRODUCT_TYPE.ID_REQUIRED},
            })
        }
        const validateResult = validateProductType(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const result = await ProductServices.updateProductType({_id: new Types.ObjectId(req.params.id)}, req.body)
        if (!result || !result.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.PRODUCT_TYPE.PRODUCT_TYPE_NOT_UPDATED,
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

export {updateProductType}
