import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {ProductService} from '../../../services/app/product/product.service'
const ProductServices = new ProductService()
import {PAGINATION} from '../../../constants/models/pagination/pagination'
import {Types} from 'mongoose'
const getProductList = async (req: Request, res: Response) => {
    try {
        const {pageNo = PAGINATION.PAGE, pageLimit = PAGINATION.LIMIT} = req.query
        const response = await ProductServices.productTypeList(pageNo, pageLimit)

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: API_MESSAGE.PRODUCT_TYPE.NO_PRODUCT_TYPE_FOUND,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                count: response.message.countProductType,
                productTypeData: response.message.data,
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

const getProduct = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || req.params.id == ':id') {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.PRODUCT_TYPE.ID_REQUIRED},
            })
        }
        const response = await ProductServices.productTypeData(new Types.ObjectId(req.params.id))

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NO_CONTENT,
                message: API_MESSAGE.PRODUCT_TYPE.NO_PRODUCT_TYPE_FOUND,
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

export {getProductList, getProduct}
