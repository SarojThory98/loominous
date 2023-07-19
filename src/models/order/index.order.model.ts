import {ORDER_MODEL_KEYS} from '../../constants/models/order/order.model.key'
import mongoose, {Schema, model, Document} from 'mongoose'
import {ORDER_STATUS} from '../../constants/orderStatus/orderStatus'

const StatusSchema = new Schema({
    status: {
        type: Number,
        enum: ORDER_STATUS,
        required: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
    },
})

export const OrderSchema: Schema = new Schema(
    {
        [ORDER_MODEL_KEYS.USERID]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        [ORDER_MODEL_KEYS.ORDERID]: {
            type: String,
            required: true,
            trim: true,
        },
        [ORDER_MODEL_KEYS.INVOICE]: {
            type: String,
            required: true,
            trim: true,
        },
        [ORDER_MODEL_KEYS.AWAITING_USER_CONFIRMATION]: {
            type: String,
            required: true,
            trim: true,
        },
        [ORDER_MODEL_KEYS.STATUS]: {
            type: [StatusSchema],
            required: true,
        },
        [ORDER_MODEL_KEYS.CURRENT_STATUS]: {
            type: Number,
            enum: ORDER_STATUS,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

interface Status {
    status: number
    lastUpdated: string
}

export interface OrderDocument extends Document {
    _id?: string
    orderId: string
    userId: string
    invoice: string
    awaitingUserConfirmation: string
    currentStatus: number
    status: Status[]
    code?: number
}

export default model<OrderDocument>('order', OrderSchema)
