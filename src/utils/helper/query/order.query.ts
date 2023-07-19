import {ObjectInterface} from '../../../interfaces/common/object.interface'
import OrderSchema, {OrderDocument} from '../../../models/order/index.order.model'
import SKUOrderItemSchema, {SKUOrderItemDocument} from '../../../models/skuOrderItem/index.skuOrderItem.model'
import mongoose from 'mongoose'
import {COMMON_MODEL_KEYS} from '../../../constants/models/common/common.models.key'

const addOrder = async (orderObject = {}): Promise<OrderDocument> => {
    try {
        return await OrderSchema.create(orderObject)
    } catch (err) {
        return err
    }
}

const addSKUItemOrders = async (SKUOrder = []): Promise<SKUOrderItemDocument[]> => {
    try {
        return await SKUOrderItemSchema.insertMany(SKUOrder)
    } catch (error) {
        return error
    }
}

const getOrderDetailsById = async (orderId) => {
    try {
        const id = new mongoose.Types.ObjectId(orderId)
        return await OrderSchema.aggregate([
            {
                $match: {_id: id},
            },
            {
                $lookup: {
                    from: 'skuorders',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderItems',
                },
            },
        ])
    } catch (error) {
        return error
    }
}

const updateOrderData = async (query = {}, update = {}) => {
    try {
        return await OrderSchema.updateOne(query, update)
    } catch (error) {
        return error
    }
}

const deleteSKUOrderById = async (id: string): Promise<ObjectInterface> => {
    try {
        return await SKUOrderItemSchema.deleteOne({_id: id})
    } catch (error) {
        return error
    }
}

export const updateSKUItemOrder = async (data: SKUOrderItemDocument) => {
    try {
        console.log(`data to update `, data)
        return await SKUOrderItemSchema.findOneAndUpdate({_id: data._id}, data, {upsert: true})
    } catch (error) {
        return error
    }
}

export const addSKUOrderItem = async (data: SKUOrderItemDocument) => {
    try {
        return await SKUOrderItemSchema.create(data)
    } catch (error) {
        return error
    }
}

const getOrdersListData = async (query = {}, skip: number, limit: number) => {
    try {
        return await OrderSchema.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: 'skuorders',
                    localField: '_id',
                    foreignField: 'orderId',
                    as: 'orderItems',
                },
            },
            {$sort: {[COMMON_MODEL_KEYS.CREATED_AT]: -1}},
            {
                $skip: Number(skip),
            },
            {
                $limit: Number(limit),
            },
        ])
    } catch (error) {
        return error
    }
}

const orderCount = async (query = {}) => {
    try {
        return await OrderSchema.count(query)
    } catch (error) {
        return error
    }
}

export const updateSKUOrderStatus = async (id, statusObject) => {
    try {
        return await SKUOrderItemSchema.findOneAndUpdate({_id: id}, statusObject)
    } catch (error) {
        return error
    }
}

export {addOrder, addSKUItemOrders, getOrderDetailsById, updateOrderData, deleteSKUOrderById, getOrdersListData, orderCount}
