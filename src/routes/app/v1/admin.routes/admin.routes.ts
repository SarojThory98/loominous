import {RouteInterface} from '../../../../interfaces/api/router.interface'
import {Router} from 'express'
import {VerifyRole} from '../../../../middlewares/verifyRole'
import {getUserList, getUserProfile} from '../../../../controllers/app/user/userList.controller'
import {AuthMiddleware} from '../../../../middlewares/verifyToken'
import {updateUserProfile} from '../../../../controllers/app/user/updateUserProfile.controller'
import {addSupplier} from '../../../../controllers/app/supplier/addSupplier.controller'
import {isExistSupplierName} from '../../../../controllers/app/supplier/existSupplier.controller'
import {getSupplierList, getSupplier} from '../../../../controllers/app/supplier/supplierListDetail.controller'
import {updateSupplier} from '../../../../controllers/app/supplier/updateSupplier.controller'
import {deleteSupplier} from '../../../../controllers/app/supplier/deleteSupplier.controller'

class AdminRoutes implements RouteInterface {
    public Router = Router()
    public VerifyRole = new VerifyRole()
    public AuthMiddleware = new AuthMiddleware()

    constructor() {
        this.Routes()
    }
    private Routes() {
        this.Router.get('/admin/user-list', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getUserList)
        this.Router.get('/admin/user-profile/:id', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getUserProfile)
        this.Router.patch('/admin/user-update-profile', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, updateUserProfile)
        this.Router.post('/admin/add-supplier', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, addSupplier)
        this.Router.post('/admin/check-supplier-exist', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, isExistSupplierName)
        this.Router.get('/admin/get-supplier-list', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getSupplierList)
        this.Router.get('/admin/get-supplier-data/:id', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, getSupplier)
        this.Router.patch('/admin/update-supplier-data/:id', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, updateSupplier)
        this.Router.delete('/admin/delete-supplier/:id', this.AuthMiddleware.authMiddleware, this.VerifyRole.verifyAdmin, deleteSupplier)
    }
}

export default AdminRoutes
