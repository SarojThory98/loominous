import {ObjectInterface} from '../common/object.interface'
import {Response} from 'express'
export interface SuccessResponseInterface {
    res: Response
    code?: number
    message?: string
    status?: boolean
    data?: ObjectInterface
    log?: {
        title: string
        object: ObjectInterface
    }
}

export interface ErrorResponseInterface {
    res: Response
    code?: number
    message?: string
    status?: boolean
    data?: ObjectInterface
    log?: {
        title: string
        object: ObjectInterface
    }
}
