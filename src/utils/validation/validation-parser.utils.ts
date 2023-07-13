import {ObjectInterface} from '../../interfaces/common/object.interface'

export const validationParser = ({validate}: ObjectInterface) => {
    let message = validate.error.details[0].message
    message = message.replace(/"/g, '')
    const error = true
    return {
        message,
        error,
    }
}
