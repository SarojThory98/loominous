import {API_RES_CODE} from '../../constants/api_res_code/api.res.code'
import {ErrorResponseInterface, SuccessResponseInterface} from '../../interfaces/api/response.interface'
import {ObjectInterface} from '../../interfaces/common/object.interface'
import {API_MESSAGE} from '../../messages/api/api-res.messages'

/**
 *
 * @/param {{
 *  res: Response,
 *  code: Number,
 *  message: String,
 *  status: Boolean,
 *  data: any,
 *  log: any
 * }} param
 * @/returns
 */
class ApiResponse {
    public SuccessJsonResponse({res, code = API_RES_CODE.SUCCESS, message = API_MESSAGE.API_SUCCESS, status = true, data = {}}: SuccessResponseInterface): ObjectInterface {
        return res.status(code as number).json({
            message,
            status,
            data,
        })
    }

    public ErrorJsonResponse({res, code = API_RES_CODE.SERVER_ERROR, message = API_MESSAGE.SERVER_ERROR, status = false, data = {}}: ErrorResponseInterface): ObjectInterface {
        return res.status(code as number).json({
            message,
            status,
            data,
        })
    }
}

export default ApiResponse
