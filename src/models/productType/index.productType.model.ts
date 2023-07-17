import {PRODUCT_TYPE_MODEL_KEYS} from '../../constants/models/productType/productType.model.key'
import mongoose, {Schema, model, Document} from 'mongoose'

export const ProductTypeSchema: Schema = new Schema(
    {
        [PRODUCT_TYPE_MODEL_KEYS.NAME]: {
            type: String,
            required: true,
            index: true,
            unique: true,
            trim: true,
        },
        [PRODUCT_TYPE_MODEL_KEYS.TAGS]: {
            type: new Schema({
                tagName: {
                    type: String,
                },
                values: {
                    type: String,
                },
            }),
        },
        [PRODUCT_TYPE_MODEL_KEYS.SUPPLIER]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            trim: true,
        },
        [PRODUCT_TYPE_MODEL_KEYS.ADMIN_NOTES]: {
            type: String,
            required: false,
            trim: true,
        },

        [PRODUCT_TYPE_MODEL_KEYS.PAST_WORK]: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
)

export interface ProductTypeDocument extends Document {
    _id?: string
    name: string
    suplier: string
    adminNotes?: string
    pastWork?: string
}

export const productTypeSchemaModel = model<ProductTypeDocument>('productType', ProductTypeSchema)
