import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {findUser} from '../../../utils/helper/query/user.query'
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'

export class UserAuthService {
    public loginUser = async (body): Promise<ObjectInterface> => {
        try {
            const emailExist = await findUser(body.email)
            if (!emailExist) {
                return {
                    status: false,
                    message: SERVICE_MESSAGE.LOGIN.USER_NOT_EXIST,
                }
            }
            if (!emailExist.isVerified) {
                return {
                    status: false,
                    message: SERVICE_MESSAGE.LOGIN.USER_NOT_VERIFIED,
                }
            }
            return {
                status: true,
                message: emailExist,
            }
        } catch (error) {
            console.log(error)
        }
    }
}
