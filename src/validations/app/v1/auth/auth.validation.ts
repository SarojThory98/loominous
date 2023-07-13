import {USER_MODEL_KEYS} from '../../../../constants/models/user/user.model.key'
import * as Joi from 'joi'

export const validateUserLogin = (input: object) => {
    const loginSchema = Joi.object().keys({
        [USER_MODEL_KEYS.EMAIL]: Joi.string().email().required(),
        [USER_MODEL_KEYS.PASSWORD]: Joi.string().required(),
    })
    return loginSchema.validate(input)
}
