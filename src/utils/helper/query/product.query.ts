import {productTypeSchemaModel, ProductTypeDocument} from '../../../models/productType/index.productType.model'
const addProductType = async (productObject = {}): Promise<ProductTypeDocument> => {
    try {
        return await productTypeSchemaModel.create(productObject)
    } catch (err) {
        return err
    }
}

const findProductTypeByName = async (productObject = {}): Promise<ProductTypeDocument> => {
    try {
        return await productTypeSchemaModel.findOne(productObject)
    } catch (err) {
        return err
    }
}

const findProductTypeList = async (pageSkip, pageLimit) => {
    try {
        return await productTypeSchemaModel.find({}).skip(Number(pageSkip)).limit(Number(pageLimit))
    } catch (err) {
        return err
    }
}

const countProductType = async () => {
    try {
        return await productTypeSchemaModel.count({})
    } catch (error) {
        return error
    }
}

const findProductTypeById = async (productId) => {
    try {
        return await productTypeSchemaModel.aggregate([
            {
                $match: {
                    _id: productId,
                },
            },
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplier',
                    foreignField: '_id',
                    as: 'supplier',
                },
            },
        ])
    } catch (err) {
        return err
    }
}

const findProductTypeAndUpdate = async (query = {}, data = {}): Promise<ProductTypeDocument> => {
    try {
        return await productTypeSchemaModel.findOneAndUpdate(query, {$set: data}, {upsert: true, new: true})
    } catch (err) {
        return err
    }
}

const findProductTypeAndDelete = async (id): Promise<ProductTypeDocument> => {
    try {
        return await productTypeSchemaModel.findByIdAndDelete(id)
    } catch (err) {
        return err
    }
}

export {addProductType, findProductTypeByName, findProductTypeList, countProductType, findProductTypeById, findProductTypeAndUpdate, findProductTypeAndDelete}
