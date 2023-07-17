import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {Request, Response} from 'express'
const API_RESPONSE = new ApiResponse()
import {SupplierService} from '../../../services/app/supplier/supplier.service'
const SupplierServices = new SupplierService()
import {PAGINATION} from '../../../constants/models/pagination/pagination'
import {Types} from 'mongoose'
const getSupplierList = async (req: Request, res: Response) => {
    try {
        const {pageNo = PAGINATION.PAGE, pageLimit = PAGINATION.LIMIT} = req.query
        const response = await SupplierServices.supplierList(pageNo, pageLimit)

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NO_CONTENT,
                message: API_MESSAGE.SUPPLIER.NO_SUPPLIER_FOUND,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                no: req.params,
                count: response.message.countSupplier,
                supplierData: response.message.data,
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

const getSupplier = async (req: Request, res: Response) => {
    try {
        if (!req.params.id || req.params.id == ':id') {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.INVALID_INPUT,
                message: API_MESSAGE.VALIDATION_ERROR,
                data: {data: API_MESSAGE.SUPPLIER.ID_REQUIRED},
            })
        }
        const response = await SupplierServices.supplierData(new Types.ObjectId(req.params.id))

        if (!response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NO_CONTENT,
                message: API_MESSAGE.SUPPLIER.NO_SUPPLIER_FOUND,
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

export {getSupplierList, getSupplier}
