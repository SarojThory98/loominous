import {ObjectInterface} from '../../../interfaces/common/object.interface'
export interface GetAdminLoginData {
    email: string
    password: string
}

export type LoginResponse = {
    data: ObjectInterface
}
