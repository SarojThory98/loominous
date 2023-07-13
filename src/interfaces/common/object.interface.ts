/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ObjectInterface {
    [key: string]: any
}
export interface TO_ERROR {
    code?: number
    message?: string
    stack?: string
}
export interface GetCommonConstantsInterface {
    commonConstants: GetCommonConstantInterface[]
}
export interface GetCommonConstantInterface {
    id: number
    value: string
}
