import {OTP_MODEL_KEYS} from '../../../../constants/models/otp/otp.model.key'
import * as Joi from 'joi'

export const validateOTP = (input: object) => {
    const OtpSchema = Joi.object().keys({
        [OTP_MODEL_KEYS.OTP]: Joi.number().required(),
        [OTP_MODEL_KEYS.USERID]: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    })
    return OtpSchema.validate(input)
}
