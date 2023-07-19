export const API_MESSAGE = {
    API_SUCCESS: 'API executed successfully',
    SERVER_ERROR: 'Something went wrong',
    UNPROCESSIBLE_ENTITY: 'Unprocessable entity',
    NOT_FOUND: 'Resource trying to access, not found',
    REQUEST_TIMEOUT: 'Request Timeout',
    FIELDS_INSERTED: 'Fields Inserted Successfully',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden',
    VALIDATION_ERROR: 'Validation error in input data',
    SIGNUP: {
        EMAIL: 'Email already exist',
        NOT_VERIFIED: 'Email exist but not verified',
        INCOMPLETE_PROFILE: 'User exist and incomplete profile',
    },
    OTP: {
        OTP_EXPIRED: 'Otp Expired',
        RESEND_OTP_SUCCESSFULLY: 'OTP resent successfully',
        VERIFY_OTP_SUBJECT: 'Welcome! Verify your Loominous account ✔',
        RESEND_OTP_SUBJECT: 'Resend OTP ✔',
        INVALID_OTP: 'Invalid code',
        ERROR: 'Unable to generate code',
        SUCCESS: 'Verification code sent successfully',
        VERIFIED: 'Code Verified successfully',
    },
    PASSWORD: {
        RESET_PASSWORD: 'Reset your Password',
        EMAIL_SENT_SUCCESSFULLY: 'Email Sent Successfully',
        RESET_PASSWORD_CLICK: 'Click Here',
        SUCCESS: 'Success',
        ERROR: 'Password updation error',
    },
    PROFILE: {
        ALREADY_EXIST: 'User profile alredy exist',
        ERROR: 'Profile addition error',
        SUCCESS: 'Profile successfully added',
        UPDATE_ERROR: 'Profile updation error',
    },
    AUTH: {
        USER_NOT_EXIST: 'User does not exist',
        USER_ALREADY_EXIST: 'User Already Exists',
        USER_NOT_FOUND: 'User not found',
        INVALID_CREDENTIALS: 'Invalid Password',
        SIGNUP_SUCCESS: 'User account created successfully',
        LOGOUT: 'Logged out successfully',
        LOGOUT_ERROR: 'Logout error',
        PASSWORD_UPDATED: 'Password updated successfully',
        PASSWORD_NOT_MATCH: 'Password do not match',
        PROFILE_INCOMPLETE: 'Please Complete Your Profile',
        EMAIL_NOT_EXISTS: 'Email does not exists',
        TOKEN_NOT_EXISTS: 'Token does not exists',
        TOKEN_EXPIRED: 'Token expired',
        USER_UPDATE: 'User account updated successfully',
        NOT_VERIFIED: 'User is not verified',
    },
    SUPPLIER: {
        SUPPLIER_NOT_ADDED: 'Supplier Not Added',
        SUPPLIER_ADDED_SUCCESSFULLY: 'Supplier Added Successfully',
        SUPPLIER_ALREADY_EXIST: 'Supplier Already Exists',
        SUPPLIER_DELETED_SUCCESSFULLY: 'Supplier Deleted Successfully ',
        SUPPLIER_CANNOT_BE_DELETED: 'Supplier Cannot Be Deleted',
        SUPPLIER_NOT_EXIST: 'Supplier Not Exist',
        NO_SUPPLIER_FOUND: 'No Supplier Found',
        SUPPLIER_CANNOT_BE_UPDATED: 'Supplier Cannot Be Updated',
        SUPPLIER_UPDATED_SUCCESSFULLY: 'Supplier Updated Successfully',
        SUPPLIER_NAME_IS_REQUIRED: 'Supplier Name Is Required',
        ERROR: 'Supplier addition error',
        NAME_REQUIRED: 'Supplier name is required',
        ID_REQUIRED: 'Supplier id is required',
    },
    PRODUCT_TYPE: {
        PRODUCT_TYPE_NOT_ADDED: 'Product Type Not Added',
        PRODUCT_TYPE_DELETED_SUCCESSFULLY: 'Product Type Deleted Successfully',
        PRODUCT_TYPE_CANNOT_BE_DELETED: 'Product Type Cannot Be Deleted',
        PRODUCT_TYPE_ALREADY_EXIST: 'Product Type  Already Exists',
        PRODUCT_TYPE_ADDED_SUCCESSFULLY: 'Product Type Added Successfully',
        NO_PRODUCT_TYPE_FOUND: 'No Product Type Found',
        PRODUCT_TYPE_NOT_UPDATED: 'Product Type Not Updated',
        PRODUCT_TYPE_UPDATED_SUCCESSFULLY: 'Product Type Updated Successfully',
        PRODUCT_TYPE_NOT_EXIST: 'Product Type Not Exist',
        PRODUCT_TYPE_NAME_IS_REQUIRED: 'Product Name Is Required',
        ID_REQUIRED: 'Product type id is required',
    },
    FABRIC_TYPE: {
        FABRIC_TYPE_DELETED_SUCCESSFULLY: 'Fabric Type Deleted Successfully',
        FABRIC_TYPE_CANNOT_BE_DELETED: 'Fabric Type Cannot Be Deleted',
        FABRIC_TYPE_ALREADY_EXIST: 'Fabric Type  Already Exists',
        FABRIC_TYPE_ADDED_SUCCESSFULLY: 'Fabric Type Added Successfully',
        NO_FABRIC_TYPE_FOUND: 'No Fabric Type Found',
        FABRIC_TYPE_NOT_UPDATED: 'Fabric Type Not Updated',
        FABRIC_TYPE_UPDATED_SUCCESSFULLY: 'Fabric Type Updated Successfully',
        FABRIC_TYPE_NOT_FOUND: 'Fabric Type Not Found',
        FABRIC_ID_REQUIRED: 'Fabric Type Id Is Required',
        FABRIC_NAME_IS_REQUIRED: 'Fabric Name Is Required',
    },
    HABERDASHERY: {
        HABERDASHERY_DELETED_SUCCESSFULLY: 'Haberdashery Deleted Successfully',
        HABERDASHERY_CANNOT_BE_DELETED: 'Haberdashery Cannot Be Deleted',
        HABERDASHERY_ALREADY_EXIST: 'Haberdashery Already Exists',
        HABERDASHERY_ADDED_SUCCESSFULLY: 'Haberdashery Added Successfully',
        NO_HABERDASHERY_FOUND: 'No Haberdashery Found',
        HABERDASHERY_NOT_UPDATED: 'Haberdashery Not Updated',
        HABERDASHERY_UPDATED_SUCCESSFULLY: 'Haberdashery Updated Successfully',
        HABERDASHERY_NOT_FOUND: 'Haberdashery Not Found',
        HABERDASHERY_ID_REQUIRED: 'Haberdashery Id Is Required',
        HABERDASHERY_NAME_IS_REQUIRED: 'Haberdashery Name Is Required',
    },
    ORDER: {
        ORDER_ADDED_SUCCESSFULLY: 'Order Added Successfully',
        ORDER_ID_NOT_FOUND: 'Order Id not found',
        ITEM_ORDER_ID_NOT_FOUND: 'Item Order Id not found',
        CALCULATIONS_NOT_RIGHT: 'Calculations not right',
        NO_ORDER_FOUND: 'No Order Found',
        ORDER_NOT_UPDATED: 'Order Not Updated',
        ORDER_UPDATED_SUCCESSFULLY: 'Order Updated Successfully',
        ORDER_STATUS_INCORRECT: 'Order Status Incorrect',
        ORDER_STATUS_NOT_UPDATED: 'Order Status Not Updated',
        ORDER_STATUS_UPDATED_SUCCESSFULLY: 'Order Status Updated Successfully',
        ORDER_NOT_ADDED: "Order can't be added",
        ORDER_EXIST_FOR_USER: 'Order is already exist for user',
        ORDER_ID_REQUIRED: 'Order id is required',
    },
    USER: {
        COMPANY_ALREADY_EXIST: 'Company Name Already Exists',
        COMPANY_NOT_EXIST: 'Company Name Not Exist',
        NO_USER_FOUND: 'No User Found',
        USER_ID_NOT_FOUND: 'User ID not found',
        USER_DELETED_SUCCESSFULLY: 'User Deleted Successfully ',
        USER_CANNOT_BE_DELETED: 'User Cannot Be Deleted',
        PENDING_ORDERS_FOUND: 'Pending Orders found',
        VERIFICATION_FAILED: 'Failed to update user verification status',
    },
    TAG: {
        TAG_ADDED_SUCCESSFULLY: 'Tag Added Successfully',
        TAG_NOT_ADDED: 'Tag Not Added',
        NO_TAG_FOUND: 'No Tag Found',
        TAG_NOT_UPDATED: 'Tag Not Updated',
        TAG_UPDATED_SUCCESSFULLY: 'Tag Updated Successfully',
        TAG_ALREADY_EXIST: 'Tag Name Already Exist',
    },
    ORDER_ITEM: {
        ALREADY_EXIST: 'Order item already exist',
        STATUS_SUCCSS: 'Order item status changed',
    },
}
