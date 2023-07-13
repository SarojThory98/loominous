import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'
import {userSchemaModel, UserDocument} from '../../../models/user/user.model'

const findUser = async (email: string): Promise<UserDocument> => {
    try {
        return await userSchemaModel.findOne({[USER_MODEL_KEYS.EMAIL]: email})
    } catch (err) {
        return err
    }
}

const createUser = async (userObject = {}): Promise<UserDocument> => {
    try {
        return await userSchemaModel.create(userObject)
    } catch (err) {
        return err
    }
}

export {findUser, createUser}
