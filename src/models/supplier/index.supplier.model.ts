import {SUPPLIER_MODEL_KEYS} from '../../constants/models/supplier/supplier.model.key'
import {Schema, model, Document} from 'mongoose'

export const SupplierSchema: Schema = new Schema(
    {
        [SUPPLIER_MODEL_KEYS.NAME]: {
            type: String,
            required: true,
            index: true,
            unique: true,
            trim: true,
        },
        [SUPPLIER_MODEL_KEYS.COUNTRY_OF_ORIGIN]: {
            type: String,
            required: false,
            trim: true,
        },
        [SUPPLIER_MODEL_KEYS.CONTACT_PREFIX]: {
            type: String,
            required: true,
            trim: true,
        },
        [SUPPLIER_MODEL_KEYS.CONTACT_INFO]: {
            type: String,
            required: true,
            trim: true,
            minLength: [10, 'no should have minimum 10 digits'],
            maxLength: [10, 'no should have maximum 10 digits'],
        },
        [SUPPLIER_MODEL_KEYS.TAGS]: {
            type: new Schema({
                tagName: {
                    type: String,
                },
                values: {
                    type: String,
                },
            }),
        },
        [SUPPLIER_MODEL_KEYS.BILLING_METHOD]: {
            type: String,
            required: true,
            trim: true,
        },

        [SUPPLIER_MODEL_KEYS.NOTES]: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
)

export interface SupplierDocument extends Document {
    _id?: string
    name: string
    countryOfOrigin?: string
    contactPrefix?: string
    contactInfo?: string
    billingMethod?: string
    notes?: string
}

export const SupplierSchemaModel = model<SupplierDocument>('supplier', SupplierSchema)
