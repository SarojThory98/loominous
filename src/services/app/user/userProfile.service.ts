import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {addProfile, findUserProfile, findProfileAndUpdate} from '../../../utils/helper/query/userProfile.query'
import {findUserAndUpdate} from '../../../utils/helper/query/user.query'
import {Types} from 'mongoose'
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'

export class ProfileService {
    public addProfile = async (body): Promise<ObjectInterface> => {
        try {
            const userId = body.userId
            const profileExist = await findUserProfile(new Types.ObjectId(userId))
            if (profileExist) {
                return {
                    message: SERVICE_MESSAGE.PROFILE.EXIST_PROFILE,
                }
            }
            const profile = await addProfile(body)
            if (profile) {
                await findUserAndUpdate({_id: new Types.ObjectId(userId)}, {[USER_MODEL_KEYS.IS_PROFILE_COMPLETE]: 1})
                return {
                    message: SERVICE_MESSAGE.PROFILE.SUCCESS,
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public updateProfile = async (userId, update): Promise<ObjectInterface> => {
        try {
            const userExist = await findProfileAndUpdate(userId, update)
            if (userExist) {
                return {
                    message: true,
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public userProfile = async (id): Promise<ObjectInterface> => {
        try {
            const userList = await findUserProfile(id)
            if (userList) {
                return {
                    message: userList,
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            console.log(error)
        }
    }
}
