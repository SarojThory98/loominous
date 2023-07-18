import {Request, Response} from 'express'
import ApiResponse from '../../../utils/api/api-respnse-handler.utils'
import {API_RES_CODE} from '../../../constants/api_res_code/api.res.code'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'
import {OrderService} from '../../../services/app/order/index.order.service'
import OrderValidations from '../../../validations/app/v1/order/index.order.validation'
import {PAGINATION} from '../../../constants/models/pagination/pagination'
const API_RESPONSE = new ApiResponse()
const Order_OrderItemValidation = new OrderValidations()
const OrderServices = new OrderService()
const addCustomerOrder = async (req: Request, res: Response) => {
    try {
        const validation = await Order_OrderItemValidation.orderValidation({
            body: req.body,
        })

        if (validation && validation.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: validation?.message || API_MESSAGE.UNPROCESSIBLE_ENTITY,
                data: {validation},
            })
        }

        const {order = {}, orderItems = {}} = req.body
        const response = await OrderServices.addOrderUser(order, orderItems, req)

        if (!response.status && response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.BAD_REQUEST,
                message: response.message,
            })
        }

        if (!response.status) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.SERVER_ERROR,
                message: API_MESSAGE.SERVER_ERROR,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            message: API_MESSAGE.ORDER.ORDER_ADDED_SUCCESSFULLY,
        })
    } catch (error) {
        return error
    }
}

const viewCustomerOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId

        const response = await OrderServices.getCustomerOrder(orderId)

        if (!response.data) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.ORDER.NO_ORDER_FOUND,
            })
        }
        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                orderDetails: response.data,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const validation = await Order_OrderItemValidation.orderValidation({
            body: req.body,
        })

        if (validation && validation.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: validation?.message || API_MESSAGE.UNPROCESSIBLE_ENTITY,
                data: {validation},
            })
        }
        const orderId = req.params.orderId
        const {order = {}, orderItems = {}} = req.body

        const response = await OrderServices.updateOrderData(orderId, order, orderItems)

        if (!response.status && response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: response.message,
            })
        }

        if (!response.status) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.ORDER.ORDER_NOT_UPDATED,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            message: API_MESSAGE.ORDER.ORDER_UPDATED_SUCCESSFULLY,
            data: response,
        })
    } catch (error) {
        return error
    }
}

const listOrders = async (req: Request, res: Response) => {
    try {
        const {page = PAGINATION.PAGE, limit = PAGINATION.LIMIT, status = 0} = req.query

        const response = await OrderServices.getAllOrdersData(page, limit, status)

        if (!response.status) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.ORDER.NO_ORDER_FOUND,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            data: {
                count: response.count,
                ordersData: response.data,
            },
        })
    } catch (error) {
        console.log(error)
    }
}

const updateSKUOrderStatus = async (req: Request, res: Response) => {
    try {
        const validation = await Order_OrderItemValidation.orderStatusUpdateValidation({
            body: req.body,
        })

        if (validation && validation.error) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.UNPROCESSIBLE_ENTITY,
                message: validation?.message || API_MESSAGE.UNPROCESSIBLE_ENTITY,
                data: {validation},
            })
        }
        const skuOrderId = req.params.id

        const response = await OrderServices.updateOrderStatus(skuOrderId, req.body, req)

        if (!response.status && response.message) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: response.message,
            })
        }

        if (!response.status) {
            return API_RESPONSE.ErrorJsonResponse({
                res,
                code: API_RES_CODE.NOT_FOUND,
                message: API_MESSAGE.ORDER.ORDER_STATUS_NOT_UPDATED,
            })
        }

        return API_RESPONSE.SuccessJsonResponse({
            res,
            code: API_RES_CODE.SUCCESS,
            message: API_MESSAGE.ORDER.ORDER_STATUS_UPDATED_SUCCESSFULLY,
        })
    } catch (error) {
        return error
    }
}

export {addCustomerOrder, viewCustomerOrder, updateOrder, listOrders, updateSKUOrderStatus}
