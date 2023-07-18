import {PRODUCT_TYPE_MODEL_KEYS} from '../../../../constants/models/productType/productType.model.key'
import * as Joi from 'joi'

export const validateProductType = (input: object) => {
    const ProdcutTypeSchema = Joi.object().keys({
        [PRODUCT_TYPE_MODEL_KEYS.NAME]: Joi.string().alphanum().min(3).max(50).trim().required(),
        [PRODUCT_TYPE_MODEL_KEYS.TAGS]: Joi.object({
            tagName: Joi.string().required(),
            values: Joi.string().required(),
        }).required(),
        [PRODUCT_TYPE_MODEL_KEYS.SUPPLIER]: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
        [PRODUCT_TYPE_MODEL_KEYS.ADMIN_NOTES]: Joi.string().optional(),
        [PRODUCT_TYPE_MODEL_KEYS.PAST_WORK]: Joi.string().optional(),
    })
    return ProdcutTypeSchema.validate(input)
}
