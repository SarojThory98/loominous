import {ORDER_MODEL_KEYS} from '../../../../constants/models/order/order.model.key'
import {ORDERITEM_MODEL_KEYS} from '../../../../constants/models/order/orderItem.model.key'
import {JoiLoginInterface, JoiResponseInterface} from '../../../../interfaces/joi/joi.interface'
import {validationParser} from '../../../../utils/validation/validation-parser.utils'
import Joi from 'joi'

const orderValidation = async ({body}: JoiLoginInterface): Promise<JoiResponseInterface> => {
    const Schema = Joi.object().keys({
        order: Joi.object()
            .keys({
                [ORDER_MODEL_KEYS.USERID]: Joi.string().required(),
                [ORDER_MODEL_KEYS.ORDERID]: Joi.string().required(),
                [ORDER_MODEL_KEYS.INVOICE]: Joi.string().required(),
                [ORDER_MODEL_KEYS.AWAITING_USER_CONFIRMATION]: Joi.string().required(),
                [ORDER_MODEL_KEYS.STATUS]: Joi.array()
                    .items(
                        Joi.object()
                            .keys({
                                status: Joi.number().required(),
                                lastUpdated: Joi.date().required(),
                            })
                            .required(),
                    )
                    .required(),
                [ORDER_MODEL_KEYS.CURRENT_STATUS]: Joi.number().required(),
            })
            .required(),
        orderItems: Joi.array()
            .items(
                Joi.object({
                    [ORDERITEM_MODEL_KEYS.ID]: Joi.string().optional(),
                    [ORDERITEM_MODEL_KEYS.ORDERID]: Joi.string().optional(),
                    [ORDERITEM_MODEL_KEYS.USERID]: Joi.string().required(),
                    [ORDERITEM_MODEL_KEYS.SKU]: Joi.string().required(),
                    [ORDERITEM_MODEL_KEYS.DESIGN_NAME]: Joi.string().required(),
                    [ORDERITEM_MODEL_KEYS.PRODUCT_TYPE]: Joi.object()
                        .keys({
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                        .required(),
                    [ORDERITEM_MODEL_KEYS.FABRIC_TYPE]: Joi.object()
                        .keys({
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                        .required(),
                    [ORDERITEM_MODEL_KEYS.SUPPLIER]: Joi.object()
                        .keys({
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                        .required(),
                    [ORDERITEM_MODEL_KEYS.MEASUREMENT]: Joi.object()
                        .keys({
                            length: Joi.number().required(),
                            waist: Joi.number().required(),
                            chest: Joi.number().required(),
                        })
                        .required(),
                    [ORDERITEM_MODEL_KEYS.HABERDASHERY]: Joi.object()
                        .keys({
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                        })
                        .required(),
                    [ORDERITEM_MODEL_KEYS.CMT_PRICE]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.FABRIC_USAGE]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.FABRIC_PRICE]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.UNIT_PRICE]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.QUANTITY]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.TOTAL_PRICE]: Joi.number().required(),
                    [ORDERITEM_MODEL_KEYS.STATUS]: Joi.array()
                        .items(
                            Joi.object()
                                .keys({
                                    status: Joi.number().required(),
                                    notes: Joi.string().required(),
                                    lastUpdated: Joi.date().required(),
                                    updatedBy: Joi.string().required(),
                                })
                                .required(),
                        )
                        .required(),
                    [ORDERITEM_MODEL_KEYS.CURRENT_STATUS]: Joi.number().required(),
                }).required(),
            )
            .required(),
    })
    let validation: JoiResponseInterface = {
        error: false,
        message: '',
    }
    const validate = Schema.validate({...body})
    if (validate.error) {
        validation = validationParser({validate})
    }

    return validation
}

const skuOrderStatusUpdateValidation = async ({body}: JoiLoginInterface): Promise<JoiResponseInterface> => {
    const Schema = Joi.object()
        .keys({
            [ORDERITEM_MODEL_KEYS.STATUS]: Joi.array()
                .items(
                    Joi.object()
                        .keys({
                            status: Joi.number().required(),
                            notes: Joi.string().required(),
                            lastUpdated: Joi.date().required(),
                            updatedBy: Joi.string().required(),
                        })
                        .required(),
                )
                .required(),
            [ORDERITEM_MODEL_KEYS.CURRENT_STATUS]: Joi.number().required(),
        })
        .required()

    let validation: JoiResponseInterface = {
        error: false,
        message: '',
    }
    const validate = Schema.validate({...body})
    if (validate.error) {
        validation = validationParser({validate})
    }

    return validation
}

export {orderValidation, skuOrderStatusUpdateValidation}
