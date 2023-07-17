import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {SupplierService} from '../../../services/app/supplier/supplier.service'
const SupplierServices = new SupplierService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'

const isExistSupplierName = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.SUPPLIER.NAME_REQUIRED},
            })
        }
        const result = await SupplierServices.existSupplier(req.body)
        if (result && result.message == SERVICE_MESSAGE.SUPPLIER.ALREADY_EXIST) {
            return API_RESPONSE.SuccessJsonResponse({
                res,
                code: API_RES_CODE.SUCCESS,
                message: API_MESSAGE.SUPPLIER.SUPPLIER_ALREADY_EXIST,
            })
        }

        return API_RESPONSE.ErrorJsonResponse({
            res,
            code: API_RES_CODE.INVALID_INPUT,
            message: API_MESSAGE.SUPPLIER.NO_SUPPLIER_FOUND,
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

export {isExistSupplierName}
