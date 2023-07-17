import {CUSTOMER_MODEL_KEYS} from '../../../constants/models/customer/customer.model.key'
import {customerSchemaModel, CustomerDocument} from '../../../models/customer/index.customer.model'
const addProfile = async (profileObject = {}): Promise<CustomerDocument> => {
    try {
        return await customerSchemaModel.create(profileObject)
    } catch (err) {
        return err
    }
}

const findUserProfile = async (userId): Promise<CustomerDocument> => {
    try {
        return await customerSchemaModel.findOne({[CUSTOMER_MODEL_KEYS.USER_ID]: userId})
    } catch (err) {
        return err
    }
}

const findProfileAndUpdate = async (query = {}, data = {}): Promise<CustomerDocument> => {
    try {
        return await customerSchemaModel.findOneAndUpdate(query, {$set: data}, {upsert: true, new: true})
    } catch (err) {
        return err
    }
}

export {addProfile, findUserProfile, findProfileAndUpdate}
