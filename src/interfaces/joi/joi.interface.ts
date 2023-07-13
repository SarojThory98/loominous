import {ObjectInterface} from '../common/object.interface'

export interface JoiResponseInterface {
    error: boolean
    message: string
    code?: number
}

export interface JoiBodyInterface {
    body: ObjectInterface
    params: ObjectInterface
    query: ObjectInterface
}

export interface JoiLoginInterface {
    body: ObjectInterface
}
