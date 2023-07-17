import {SupplierSchemaModel, SupplierDocument} from '../../../models/supplier/index.supplier.model'
const addSupplier = async (supplierObject = {}): Promise<SupplierDocument> => {
    try {
        return await SupplierSchemaModel.create(supplierObject)
    } catch (err) {
        return err
    }
}

const findSupplierByName = async (supplierObject = {}): Promise<SupplierDocument> => {
    try {
        return await SupplierSchemaModel.findOne(supplierObject)
    } catch (err) {
        return err
    }
}

const findSupplierList = async (pageSkip, pageLimit) => {
    try {
        return await SupplierSchemaModel.find({}).skip(Number(pageSkip)).limit(Number(pageLimit))
    } catch (err) {
        return err
    }
}

const countSupplier = async () => {
    try {
        return await SupplierSchemaModel.count({})
    } catch (error) {
        return error
    }
}

const findSupplierById = async (userId): Promise<SupplierDocument> => {
    try {
        return await SupplierSchemaModel.findOne({_id: userId})
    } catch (err) {
        return err
    }
}

const findSupplierAndUpdate = async (query = {}, data = {}): Promise<SupplierDocument> => {
    try {
        return await SupplierSchemaModel.findOneAndUpdate(query, {$set: data}, {upsert: true, new: true})
    } catch (err) {
        return err
    }
}

const findSupplierAndDelete = async (id): Promise<SupplierDocument> => {
    try {
        return await SupplierSchemaModel.findByIdAndDelete(id)
    } catch (err) {
        return err
    }
}

export {addSupplier, findSupplierByName, findSupplierList, countSupplier, findSupplierById, findSupplierAndUpdate, findSupplierAndDelete}
