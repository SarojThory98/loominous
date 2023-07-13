import mongoose, {Schema, model, Document} from 'mongoose'
import {OTP_MODEL_KEYS} from '../../constants/models/otp/otp.model.key'

export const OtpSchema: Schema = new Schema(
    {
        [OTP_MODEL_KEYS.OTP]: {
            type: Number,
            required: true,
        },
        [OTP_MODEL_KEYS.USERID]: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)
export interface OtpDocument extends Document {
    _id?: string
    otp: number
    userId: string
}

export const otpSchemaModel = model<OtpDocument>('otp', OtpSchema)
