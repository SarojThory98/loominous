import {USER_TYPE_ENUM} from '../../constants/models/Enums/userEnum'
import {SIGN_UP_ENUM} from '../../constants/models/Enums/signUpEnums'
import {USER_MODEL_KEYS} from '../../constants/models/user/user.model.key'
import {Schema, Document, model} from 'mongoose'

export const UserSchema: Schema = new Schema(
    {
        [USER_MODEL_KEYS.EMAIL]: {
            type: String,
            required: true,
        },
        [USER_MODEL_KEYS.INCORRECT_OTP_COUNT]: {
            type: Number,
            required: false,
            default: 0,
        },
        [USER_MODEL_KEYS.PASSWORD]: {
            type: String,
            required: true,
        },
        [USER_MODEL_KEYS.TYPE]: {
            type: Number,
            enum: USER_TYPE_ENUM,
            default: USER_TYPE_ENUM.CUSTOMER,
        },
        [USER_MODEL_KEYS.SIGNUP_FROM]: {
            type: Number,
            enum: SIGN_UP_ENUM,
            required: true,
        },
        [USER_MODEL_KEYS.RESET_PASSWORD_TOKEN]: {
            type: String,
            required: false,
            default: null,
        },
        [USER_MODEL_KEYS.IS_VERIFIED]: {
            type: Boolean,
            default: false,
        },
        [USER_MODEL_KEYS.IS_PROFILE_COMPLETE]: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
)
export interface UserDocument extends Document {
    _id?: string
    email: string
    password?: string
    type: number
    signupFrom: number
    resetPasswordToken: string
    isVerified: boolean
    isProfileComplete: boolean
}

export const userSchemaModel = model<UserDocument>('user', UserSchema)
