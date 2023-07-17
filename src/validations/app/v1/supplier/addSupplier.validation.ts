import {SUPPLIER_MODEL_KEYS} from '../../../../constants/models/supplier/supplier.model.key'
import * as Joi from 'joi'

export const validateSupplier = (input: object) => {
    const supplierSchema = Joi.object().keys({
        [SUPPLIER_MODEL_KEYS.NAME]: Joi.string().alphanum().min(3).max(50).trim().required(),
        [SUPPLIER_MODEL_KEYS.COUNTRY_OF_ORIGIN]: Joi.string().required(),
        [SUPPLIER_MODEL_KEYS.CONTACT_PREFIX]: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .trim()
            .required(),
        [SUPPLIER_MODEL_KEYS.CONTACT_INFO]: Joi.string()
            .length(10)
            .pattern(/^[0-9]+$/)
            .required(),
        [SUPPLIER_MODEL_KEYS.TAGS]: Joi.object({
            tagName: Joi.string().required(),
            values: Joi.string().required(),
        }).required(),
        [SUPPLIER_MODEL_KEYS.BILLING_METHOD]: Joi.string().trim().required(),
        [SUPPLIER_MODEL_KEYS.NOTES]: Joi.string().optional(),
    })
    return supplierSchema.validate(input)
}
