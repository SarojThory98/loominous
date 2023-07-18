import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {findProductTypeByName, addProductType, findProductTypeList, countProductType, findProductTypeById, findProductTypeAndUpdate, findProductTypeAndDelete} from '../../../utils/helper/query/product.query'
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
import {PRODUCT_TYPE_MODEL_KEYS} from '../../../constants/models/productType/productType.model.key'
import {Types} from 'mongoose'

export class ProductService {
    public addProductType = async (body): Promise<ObjectInterface> => {
        try {
            const product = await addProductType({
                [PRODUCT_TYPE_MODEL_KEYS.NAME]: body.name,
                [PRODUCT_TYPE_MODEL_KEYS.TAGS]: body.tags,
                [PRODUCT_TYPE_MODEL_KEYS.SUPPLIER]: new Types.ObjectId(body.supplier),
                [PRODUCT_TYPE_MODEL_KEYS.ADMIN_NOTES]: body.adminNotes,
                [PRODUCT_TYPE_MODEL_KEYS.PAST_WORK]: body.pastWork,
            })
            if (!product || product.errors) {
                return {
                    message: SERVICE_MESSAGE.PRODUCT.ERROR,
                }
            }
            return {
                message: SERVICE_MESSAGE.PRODUCT.SUCCESS,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public existProductType = async (body): Promise<ObjectInterface> => {
        try {
            const name = body.name
            const productTypeExist = await findProductTypeByName({[PRODUCT_TYPE_MODEL_KEYS.NAME]: name})
            if (productTypeExist) {
                return {
                    message: SERVICE_MESSAGE.PRODUCT.ALREADY_EXIST,
                }
            }
            return {
                message: SERVICE_MESSAGE.PRODUCT.SUCCESS,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public productTypeList = async (pageNo, pageLimit): Promise<ObjectInterface> => {
        try {
            const skipPages = (pageNo - 1) * pageLimit
            const productLists = await findProductTypeList(skipPages, pageLimit)
            const countAllProducts = await countProductType()
            if (productLists && productLists.length) {
                return {
                    message: {
                        data: productLists,
                        countProductType: countAllProducts,
                    },
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            console.log(error)
        }
    }

    public productTypeData = async (id): Promise<ObjectInterface> => {
        try {
            const productType = await findProductTypeById(id)
            if (productType) {
                return {
                    message: productType,
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            console.log(error)
        }
    }

    public updateProductType = async (Id, update): Promise<ObjectInterface> => {
        try {
            const productTypeExist = await findProductTypeAndUpdate(Id, update)
            if (productTypeExist) {
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

    public deleteProductType = async (Id): Promise<ObjectInterface> => {
        try {
            const supplierExist = await findProductTypeAndDelete(Id)
            if (supplierExist) {
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
}
