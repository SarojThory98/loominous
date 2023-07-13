import {CUSTOMER_MODEL_KEYS} from '../../constants/models/customer/customer.model.key'
import mongoose, {Schema, model, Document} from 'mongoose'

const CompanyLogoSchema = new Schema({
    fileName: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    },
})

const CustomerSchema: Schema = new Schema(
    {
        [CUSTOMER_MODEL_KEYS.USER_ID]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        [CUSTOMER_MODEL_KEYS.FIRST_NAME]: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        [CUSTOMER_MODEL_KEYS.LAST_NAME]: {
            type: String,
            lowercase: true,
            trim: true,
            required: true,
        },
        [CUSTOMER_MODEL_KEYS.ADDRESS]: {
            type: String,
        },
        [CUSTOMER_MODEL_KEYS.CONTACT_PREFIX]: {
            type: String,
            required: true,
            trim: true,
        },
        [CUSTOMER_MODEL_KEYS.CONTACT]: {
            type: String,
            required: true,
            trim: true,
            minLength: [10, 'no should have minimum 10 digits'],
            maxLength: [10, 'no should have maximum 10 digits'],
        },
        [CUSTOMER_MODEL_KEYS.COMPANY_NAME]: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
            sparse: true,
        },
        [CUSTOMER_MODEL_KEYS.EMAIL]: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        [CUSTOMER_MODEL_KEYS.DOB]: {
            type: Date,
            trim: true,
        },
        [CUSTOMER_MODEL_KEYS.SOCIAL_MEDIA]: {
            type: [String],
            trim: true,
        },
        [CUSTOMER_MODEL_KEYS.WEBSITE]: {
            type: String,
            trim: true,
        },
        [CUSTOMER_MODEL_KEYS.COMPANY_LOGO]: {
            type: CompanyLogoSchema,
        },
        [CUSTOMER_MODEL_KEYS.DESCRIPTION]: {
            type: String,
        },
        [CUSTOMER_MODEL_KEYS.LOCATION]: {
            type: [Number],
        },
    },
    {
        timestamps: true,
    },
)

interface Logo {
    _id?: string
    date: Date
    key: string
    type: string
    path: string
}

export interface CustomerDocument extends Document {
    _id?: string
    userId: string
    firstName: string
    lastName: string
    email: string
    dob?: Date
    socialMedia?: string
    website?: string
    companyLogo?: Logo
    description?: string
    location?: [number]
    companyName?: string
    contact: string
    contactPrefix: string
    address?: string
    code?: number
}

export const customerSchemaModel = model<CustomerDocument>('customer', CustomerSchema)
