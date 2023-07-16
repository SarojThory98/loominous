import {USER_MODEL_KEYS} from '../../../constants/models/user/user.model.key'
import {userSchemaModel, UserDocument} from '../../../models/user/user.model'

const findUser = async (email: string): Promise<UserDocument> => {
    try {
        return await userSchemaModel.findOne({[USER_MODEL_KEYS.EMAIL]: email})
    } catch (err) {
        return err
    }
}

const findUserByQuery = async (query = {}): Promise<UserDocument> => {
    try {
        return await userSchemaModel.findOne(query)
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

const findUserAndUpdate = async (query = {}, data = {}): Promise<UserDocument> => {
    try {
        return await userSchemaModel.findOneAndUpdate(query, {$set: data}, {upsert: true, new: true})
    } catch (err) {
        return err
    }
}

const findUserList = async (pageSkip, pageLimit) => {
    try {
        return await userSchemaModel.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userInfo',
                },
            },
            {
                $skip: Number(pageSkip),
            },
            {
                $limit: Number(pageLimit),
            },
        ])
    } catch (err) {
        return err
    }
}

const countUser = async () => {
    try {
        return await userSchemaModel.count({})
    } catch (error) {
        return error
    }
}

export {findUser, createUser, findUserAndUpdate, findUserByQuery, findUserList, countUser}
