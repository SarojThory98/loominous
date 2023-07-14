import {USER_MODEL_KEYS} from '../../../../constants/models/user/user.model.key'
import * as Joi from 'joi'

export const validateUser = (input: object) => {
    const signupSchema = Joi.object().keys({
        [USER_MODEL_KEYS.EMAIL]: Joi.string().email().required(),
        [USER_MODEL_KEYS.PASSWORD]: Joi.string().required(),
        [USER_MODEL_KEYS.CONFIRM_PASSWORD]: Joi.string().valid(Joi.ref(USER_MODEL_KEYS.PASSWORD)).required(),
    })
    return signupSchema.validate(input)
}
