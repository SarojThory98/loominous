import {ORDERITEM_MODEL_KEYS} from '../../constants/models/order/orderItem.model.key'
import mongoose, {Schema, model, Document} from 'mongoose'
import {SKU_ORDER_STATUS} from '../../constants/orderStatus/orderStatus'

const TypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
})

const MeasurementSchema = new Schema({
    length: {
        type: Number,
        required: true,
    },
    waist: {
        type: Number,
        required: true,
    },
    chest: {
        type: Number,
        required: true,
    },
})

const StatusSchema = new Schema({
    status: {
        type: Number,
        enum: SKU_ORDER_STATUS,
        required: true,
    },
    notes: {
        type: String,
        required: true,
        trim: true,
    },
    lastUpdated: {
        type: Date,
        required: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

export const SKUOrderItemSchema: Schema = new Schema(
    {
        [ORDERITEM_MODEL_KEYS.ORDERID]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.USERID]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.SKU]: {
            type: String,
            required: true,
            trim: true,
        },
        [ORDERITEM_MODEL_KEYS.DESIGN_NAME]: {
            type: String,
            required: true,
            trim: true,
        },
        [ORDERITEM_MODEL_KEYS.PRODUCT_TYPE]: {
            type: TypeSchema,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.FABRIC_TYPE]: {
            type: TypeSchema,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.SUPPLIER]: {
            type: TypeSchema,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.MEASUREMENT]: {
            type: MeasurementSchema,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.HABERDASHERY]: {
            type: TypeSchema,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.CMT_PRICE]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.FABRIC_USAGE]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.FABRIC_PRICE]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.UNIT_PRICE]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.QUANTITY]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.TOTAL_PRICE]: {
            type: Number,
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.STATUS]: {
            type: [StatusSchema],
            required: true,
        },
        [ORDERITEM_MODEL_KEYS.CURRENT_STATUS]: {
            type: Number,
            enum: SKU_ORDER_STATUS,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

interface Type {
    _id?: string
    name: string
}

interface Measurement {
    length: number
    waist: number
    chest: number
}

interface Status {
    status: number
    notes: string
    lastUpdated: string
    updatedBy: string
}

export interface SKUOrderItemDocument extends Document {
    _id?: string
    orderId: string
    userId: string
    sku: string
    designName: string
    productType: Type
    fabricType: Type
    supplier: Type
    measurement: Measurement
    haberdashery: Type
    cmt_price: number
    fabric_usage: number
    fabric_price: number
    unit_price: number
    quantity: number
    totalPrice: number
    status: Status[]
    currentStatus: number
    code?: number
}

export default model<SKUOrderItemDocument>('skuOrder', SKUOrderItemSchema)
