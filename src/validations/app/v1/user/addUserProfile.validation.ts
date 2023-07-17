import {CUSTOMER_MODEL_KEYS} from '../../../../constants/models/customer/customer.model.key'
import * as Joi from 'joi'

export const validateProfile = (input: object) => {
    const profileSchema = Joi.object().keys({
        [CUSTOMER_MODEL_KEYS.USER_ID]: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        [CUSTOMER_MODEL_KEYS.FIRST_NAME]: Joi.string().alphanum().min(3).max(50).trim().required(),
        [CUSTOMER_MODEL_KEYS.LAST_NAME]: Joi.string().alphanum().min(3).max(50).trim().required(),
        [CUSTOMER_MODEL_KEYS.ADDRESS]: Joi.string().alphanum().trim().allow('').optional(),
        [CUSTOMER_MODEL_KEYS.CONTACT_PREFIX]: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim()
            .required(),
        [CUSTOMER_MODEL_KEYS.CONTACT]: Joi.string()
            .regex(/^\d{1,10}$/)
            .trim()
            .required(),
        [CUSTOMER_MODEL_KEYS.COMPANY_NAME]: Joi.string().alphanum().trim().allow('').optional(),
        [CUSTOMER_MODEL_KEYS.EMAIL]: Joi.string().email().trim().required(),
        [CUSTOMER_MODEL_KEYS.DOB]: Joi.date().max('now').allow(null).allow('').optional(),
        [CUSTOMER_MODEL_KEYS.SOCIAL_MEDIA]: Joi.string()
            .pattern(/^(\s*https?:\/\/[^\s,]+(?:,\s*https?:\/\/[^\s,]+)*)?$/)
            .allow('')
            .trim()
            .optional(),
        [CUSTOMER_MODEL_KEYS.WEBSITE]: Joi.string()
            .uri({scheme: ['http', 'https']})
            .trim()
            .allow('')
            .optional(),
        [CUSTOMER_MODEL_KEYS.COMPANY_LOGO]: Joi.string().allow('').optional(),
        [CUSTOMER_MODEL_KEYS.DESCRIPTION]: Joi.string().trim().allow('').optional(),
        [CUSTOMER_MODEL_KEYS.LOCATION]: Joi.string().trim().allow('').optional(),
    })
    return profileSchema.validate(input)
}
