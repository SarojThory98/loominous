import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
import {validateSupplier} from '../../../validations/app/v1/supplier/addSupplier.validation'
const API_RESPONSE = new ApiResponse()
import {SupplierService} from '../../../services/app/supplier/supplier.service'
const SupplierServices = new SupplierService()
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
const addSupplier = async (req: Request, res: Response) => {
    try {
        const validateResult = validateSupplier(req.body)
        if (validateResult && validateResult.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: validateResult.error,
            })
        }
        const supplierName = await SupplierServices.existSupplier(req.body)
        if (supplierName && supplierName.message == SERVICE_MESSAGE.SUPPLIER.ALREADY_EXIST) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.SUPPLIER.SUPPLIER_ALREADY_EXIST,
            })
        }

        const result = await SupplierServices.addSupplier(req.body)
        if (result && result.message == SERVICE_MESSAGE.SUPPLIER.ERROR) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: API_MESSAGE.SUPPLIER.SUPPLIER_NOT_ADDED,
                data: {},
            })
        }
        if (result && result.message == SERVICE_MESSAGE.SUPPLIER.SUCCESS) {
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

export {addSupplier}
