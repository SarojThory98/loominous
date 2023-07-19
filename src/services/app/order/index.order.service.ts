import {Request} from 'express'
import _ from 'lodash'
import {addOrder, addSKUItemOrders, getOrderDetailsById, updateOrderData, updateSKUItemOrder, addSKUOrderItem, getOrdersListData, orderCount, updateSKUOrderStatus, deleteSKUOrderById} from '../../../utils/helper/query/order.query'
import {OrderDocument} from '../../../models/order/index.order.model'
import {SKUOrderItemDocument} from '../../../models/skuOrderItem/index.skuOrderItem.model'
import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {SKU_ORDER_STATUS, ORDER_STATUS} from '../../../constants/orderStatus/orderStatus'
import {API_MESSAGE} from '../../../messages/api/api-res.messages'

export class OrderService {
    public addOrderUser = async (order: OrderDocument, skuOrderItem: SKUOrderItemDocument[], req: Request): Promise<ObjectInterface> => {
        try {
            const {currentStatus = '', status = []} = order
            const currentLastStatus = status[status.length - 1]
            if (!ORDER_STATUS[currentStatus] || currentLastStatus.status !== currentStatus || !currentLastStatus) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ORDER_ID_NOT_FOUND,
                }
            }

            const insertData = await addOrder(order)

            if (!insertData?._id) {
                return {
                    status: false,
                }
            }

            const skuOrderItems = _.cloneDeep(skuOrderItem)

            let invalidStatus = false,
                wrongCalculation = false
            for (const i of skuOrderItems) {
                const {currentStatus = ''} = i
                if (!SKU_ORDER_STATUS[currentStatus]) {
                    invalidStatus = true
                    break
                }

                const {cmt_price, fabric_usage, fabric_price, unit_price, quantity, totalPrice} = i
                const unitPrice = cmt_price + fabric_usage * fabric_price
                if (Math.floor(unitPrice) !== Math.floor(unitPrice)) {
                    wrongCalculation = true
                    break
                }

                const total_price = unit_price * quantity
                if (Math.floor(total_price) !== Math.floor(totalPrice)) {
                    wrongCalculation = true
                    break
                }
                i['orderId'] = String(insertData._id)
            }

            if (invalidStatus) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ITEM_ORDER_ID_NOT_FOUND,
                }
            }

            if (wrongCalculation) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.CALCULATIONS_NOT_RIGHT,
                }
            }

            const data = await addSKUItemOrders(skuOrderItems)

            if (data && _.isArray(data) && data.length > 0) {
                return {
                    status: true,
                }
            }
            return {
                status: false,
            }
        } catch (error) {
            return {status: false}
        }
    }

    public getCustomerOrder = async (orderId): Promise<ObjectInterface> => {
        try {
            const orderDetails = await getOrderDetailsById(orderId)
            if (!orderDetails || !orderDetails[0]) {
                return {
                    data: false,
                }
            }

            const order = _.cloneDeep(orderDetails[0])

            return {
                data: order,
            }
        } catch (error) {
            return error
        }
    }

    public updateOrderData = async (orderId, order, skuOrderItem): Promise<ObjectInterface> => {
        try {
            const {currentStatus = '', status = []} = order
            const currentLastStatus = status[status.length - 1]
            if (!ORDER_STATUS[currentStatus] || currentLastStatus.status !== currentStatus || !currentLastStatus) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ORDER_ID_NOT_FOUND,
                }
            }

            const orderDetails = await getOrderDetailsById(orderId)
            if (!orderDetails || !orderDetails[0]) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.NO_ORDER_FOUND,
                }
            }

            const query = {_id: orderId}
            const updates = {$set: order}

            const updateOrder = await updateOrderData(query, updates)
            if (!updateOrder.acknowledged || !updateOrder.modifiedCount) {
                return {
                    status: false,
                }
            }

            const savedOrder = orderDetails[0]
            const {orderItems: savedOrderItems} = savedOrder

            for (const savedOrderItem of savedOrderItems) {
                const {_id} = savedOrderItem
                const itemData = skuOrderItem.findIndex((item) => item._id === _id)
                if (itemData < 0) {
                    await deleteSKUOrderById(_id)
                }
            }

            const skuOrderItems = _.cloneDeep(skuOrderItem)

            let invalidStatus = false,
                wrongCalculation = false
            for (const i of skuOrderItems) {
                const {currentStatus = ''} = i
                if (!SKU_ORDER_STATUS[currentStatus]) {
                    invalidStatus = true
                    break
                }

                const {cmt_price, fabric_usage, fabric_price, unit_price, quantity, totalPrice} = i
                const unitPrice = cmt_price + fabric_usage * fabric_price
                if (Math.floor(unitPrice) !== Math.floor(unitPrice)) {
                    wrongCalculation = true
                    break
                }

                const total_price = unit_price * quantity
                if (Math.floor(total_price) !== Math.floor(totalPrice)) {
                    wrongCalculation = true
                    break
                }
            }

            if (invalidStatus) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ITEM_ORDER_ID_NOT_FOUND,
                }
            }

            if (wrongCalculation) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.CALCULATIONS_NOT_RIGHT,
                }
            }
            for (const i of skuOrderItems) {
                if (i._id) {
                    await updateSKUItemOrder(i)
                } else {
                    await addSKUOrderItem(i)
                }
            }
            return {status: true}
        } catch (error) {
            console.log(error)
            console.log(`updateOrderData exception got `, error)
            return {status: false, message: error}
        }
    }

    public getAllOrdersData = async (page, limit, filter): Promise<ObjectInterface> => {
        try {
            let query
            const skip = (page - 1) * limit
            query = {
                status: Number(filter),
            }
            if (filter === '-1') {
                query = {
                    status: {$in: [ORDER_STATUS.PRODUCTION, ORDER_STATUS.SAMPLE, ORDER_STATUS.TECHNICAL]},
                }
            }
            if (!filter) {
                query = {}
            }

            const ordersData = await getOrdersListData(query, skip, limit)
            const totalCount = await orderCount(query)
            if (!ordersData.length && !totalCount) {
                return {status: false}
            }

            return {
                status: true,
                data: ordersData,
                count: totalCount,
            }
        } catch (error) {
            console.log(error)
        }
    }

    public updateOrderStatus = async (id, statusDetails, req): Promise<ObjectInterface> => {
        try {
            const {currentStatus = '', status = []} = statusDetails
            const lastOrderStatusToUpdate = status[status.length - 1]
            if (!SKU_ORDER_STATUS[currentStatus] || !lastOrderStatusToUpdate) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ORDER_ID_NOT_FOUND,
                }
            }

            const {status: lastStatus} = lastOrderStatusToUpdate
            if (currentStatus !== lastStatus) {
                return {
                    status: false,
                    message: API_MESSAGE.ORDER.ORDER_STATUS_INCORRECT,
                }
            }

            await updateSKUOrderStatus(id, statusDetails)

            return {
                status: true,
            }
        } catch (error) {
            return {
                status: false,
            }
        }
    }
}
