import {FABRIC_TYPE_MODEL_KEYS} from '../../constants/models/FabricType/fabricType.model.key'
import mongoose, {Schema, model, Document} from 'mongoose'

const SupplierSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})
const TagNameSchema = new Schema({
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

const TagValueSchema = new Schema({
    value: {
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
const TagSchema = new Schema({
    tag: {
        type: TagNameSchema,
        required: true,
    },
    values: {
        type: [TagValueSchema],
        required: true,
    },
})
export const FabricTypeSchema: Schema = new Schema(
    {
        [FABRIC_TYPE_MODEL_KEYS.NAME]: {
            type: String,
            required: true,
            index: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.FABRIC_CODE]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.ATTACHMENT]: [
            {
                key: {
                    type: String,
                },
                type: {
                    type: String,
                },
            },
        ],
        [FABRIC_TYPE_MODEL_KEYS.ADMIN_NOTES]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.SUPPLIER]: {
            type: SupplierSchema,
            required: false,
        },
        [FABRIC_TYPE_MODEL_KEYS.FABRIC_COMPOSITION]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.MOQ]: {
            type: Number,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.SUPPLIER_MOQ]: {
            type: Number,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.WIDTH]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.WEIGHT]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.COST]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.SUPPLIER_COST]: {
            type: String,
            required: false,
            trim: true,
        },
        [FABRIC_TYPE_MODEL_KEYS.TAGS]: {
            type: [TagSchema],
            required: false,
        },
    },
    {
        timestamps: true,
    },
)

FabricTypeSchema.index(
    {
        [FABRIC_TYPE_MODEL_KEYS.NAME]: 1,
    },
    {
        unique: true,
        collation: {
            locale: 'en_US',
            strength: 2,
        },
    },
)

interface TAGNAME {
    name: string
    _id: string
}

interface VALUES {
    value: string
    _id: string
}

interface tags {
    tagname: TAGNAME
    values: VALUES[]
}

interface attachment {
    _id?: string
    date: Date
    key: string
    type: string
}

interface supplier {
    name: string
    id: string
}
export interface FabricTypeDocument extends Document {
    _id?: string
    name: string
    fabricCode?: string
    attachment?: attachment[]
    adminNotes?: string
    supplier?: supplier
    fabricComposition?: string
    moq?: number
    supplierMoq?: number
    width?: string
    weight?: string
    cost?: string
    supplierCost?: string
    tags?: tags[]
    code?: number
}

export default model<FabricTypeDocument>('fabricType', FabricTypeSchema)
