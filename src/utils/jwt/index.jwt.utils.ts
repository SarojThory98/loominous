import jwt from 'jsonwebtoken'
import {ObjectInterface} from '../../interfaces/common/object.interface'

export const generateToken = async (payload, expiry = ''): Promise<ObjectInterface> => {
    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: expiry ? expiry : process.env.JWT_EXPIRY,
        })
        return token
    } catch (error) {
        return error
    }
}
