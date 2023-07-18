import mongoose, {Schema, model, Document} from 'mongoose'
import {ORDERITEM_MODEL_KEYS} from '../../constants/models/order/orderItem.model.key'

export const OrderItemSchema: Schema = new Schema({
    [ORDERITEM_MODEL_KEYS.PRODUCT_ID]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    [ORDERITEM_MODEL_KEYS.STATUS]: {
        required: true,
        type: Number,
        default: 1,
    },
    [ORDERITEM_MODEL_KEYS.SUPPLIER_ID]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})
export interface OrderItemDocument extends Document {
    _id?: string
    productId: string
    status: number
    supplierId: string
}

export const orderItemSchemaModel = model<OrderItemDocument>('orderItem', OrderItemSchema)
