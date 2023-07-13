import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {findUser, createUser} from '../../../utils/helper/query/user.query'
import bcrypt from 'bcrypt'
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
import {createOTP, verifyOTP} from '../../../utils/helper/query/otp.query'
import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'
import {OTP_MODEL_KEYS} from '../../../constants/models/otp/otp.model.key'
import {COMMON_KEYS} from '../../../constants/common/common.keys'

export class UserService {
    public registerUser = async (body): Promise<ObjectInterface> => {
        try {
            const email = body.email
            const emailExist = await findUser(email)
            if (emailExist && !emailExist.isVerified) {
                return {
                    message: SERVICE_MESSAGE.SIGNUP.EXIST_EMAIL_NOT_VERIFIED,
                }
            }
            if (emailExist && emailExist.isVerified && emailExist.isProfileComplete) {
                return {
                    message: SERVICE_MESSAGE.SIGNUP.EXIST_EMAIL,
                }
            }
            if (emailExist && emailExist.isVerified && !emailExist.isProfileComplete) {
                return {
                    message: SERVICE_MESSAGE.SIGNUP.INCOMPLETE_PROFILE,
                }
            }

            const hashedPassword = await bcrypt.hash(body.password, 10)

            const userData = {
                [USER_MODEL_KEYS.EMAIL]: email,
                [USER_MODEL_KEYS.PASSWORD]: hashedPassword,
                [USER_MODEL_KEYS.IS_VERIFIED]: false,
                [USER_MODEL_KEYS.IS_PROFILE_COMPLETE]: false,
            }
            const createdUserData = await createUser(userData)

            const otpData = {
                [OTP_MODEL_KEYS.OTP]: COMMON_KEYS.OTP,
                [OTP_MODEL_KEYS.USERID]: createdUserData._id,
            }
            await createOTP(otpData)

            if (!createdUserData) {
                return {
                    message: SERVICE_MESSAGE.SIGNUP.USER_CREATION_ERROR,
                }
            }
            return {
                message: SERVICE_MESSAGE.SIGNUP.USER_CREATION_SUCCESS,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public verifyUserOTP = async (body): Promise<ObjectInterface> => {
        const OTPdata = verifyOTP({[OTP_MODEL_KEYS.USERID]: body.params.id})
        if (OTPdata) {
            return {
                otp: (await OTPdata).otp,
            }
        }
        return {
            otp: false,
        }
    }
}
