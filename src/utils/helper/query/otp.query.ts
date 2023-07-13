import {otpSchemaModel, OtpDocument} from '../../../models/otp/index.otp.model'

const createOTP = async (otpObject = {}): Promise<OtpDocument> => {
    try {
        return await otpSchemaModel.create(otpObject)
    } catch (err) {
        return err
    }
}

const verifyOTP = async (otpObject = {}): Promise<OtpDocument> => {
    try {
        return await otpSchemaModel.findOne(otpObject)
    } catch (err) {
        return err
    }
}

export {createOTP, verifyOTP}
