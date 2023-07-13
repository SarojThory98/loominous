export interface UserDataInterface {
    _id?: string
    email: string
    password: string
    type: number
    resetPasswordToken: string | null
}
