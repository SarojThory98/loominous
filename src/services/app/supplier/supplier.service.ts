import {ObjectInterface} from '../../../interfaces/common/object.interface'
import {findSupplierByName, addSupplier, findSupplierList, countSupplier, findSupplierById, findSupplierAndUpdate, findSupplierAndDelete} from '../../../utils/helper/query/supplier.query'
import {SERVICE_MESSAGE} from '../../../messages/service/service.messages'
import {SUPPLIER_MODEL_KEYS} from '../../../constants/models/supplier/supplier.model.key'

export class SupplierService {
    public addSupplier = async (body): Promise<ObjectInterface> => {
        try {
            const supplier = await addSupplier(body)
            if (!supplier || supplier.errors) {
                return {
                    message: SERVICE_MESSAGE.SUPPLIER.ERROR,
                }
            }
            return {
                message: SERVICE_MESSAGE.SUPPLIER.SUCCESS,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public existSupplier = async (body): Promise<ObjectInterface> => {
        try {
            const name = body.name
            const supplierExist = await findSupplierByName({[SUPPLIER_MODEL_KEYS.NAME]: name})
            if (supplierExist) {
                return {
                    message: SERVICE_MESSAGE.SUPPLIER.ALREADY_EXIST,
                }
            }
            return {
                message: SERVICE_MESSAGE.SUPPLIER.SUCCESS,
            }
        } catch (error) {
            return {
                message: error,
            }
        }
    }

    public supplierList = async (pageNo, pageLimit): Promise<ObjectInterface> => {
        try {
            const skipPages = (pageNo - 1) * pageLimit
            const userLists = await findSupplierList(skipPages, pageLimit)
            const countAllSuppliers = await countSupplier()
            if (userLists && userLists.length) {
                return {
                    message: {
                        data: userLists,
                        countSupplier: countAllSuppliers,
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

    public supplierData = async (id): Promise<ObjectInterface> => {
        try {
            const supplier = await findSupplierById(id)
            if (supplier) {
                return {
                    message: supplier,
                }
            }
            return {
                message: false,
            }
        } catch (error) {
            console.log(error)
        }
    }

    public updateSupplier = async (userId, update): Promise<ObjectInterface> => {
        try {
            const supplierExist = await findSupplierAndUpdate(userId, update)
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

    public deleteSupplier = async (userId): Promise<ObjectInterface> => {
        try {
            const supplierExist = await findSupplierAndDelete(userId)
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
