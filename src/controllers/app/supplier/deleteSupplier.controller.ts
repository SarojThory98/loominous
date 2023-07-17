import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {SupplierService} from '../../../services/app/supplier/supplier.service'
const SupplierServices = new SupplierService()
import {Types} from 'mongoose'

const deleteSupplier = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || req.params.id == ':id') {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.SUPPLIER.ID_REQUIRED},
            })
        }
        const result = await SupplierServices.deleteSupplier(new Types.ObjectId(req.params.id))
        if (!result || !result.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.SUPPLIER.SUPPLIER_CANNOT_BE_DELETED,
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

export {deleteSupplier}
