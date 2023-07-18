import OrderValidation from './order.validation'

class OrderValidations {
    public orderValidation = new OrderValidation().orderValidation
    public orderStatusUpdateValidation = new OrderValidation().skuOrderStatusUpdateValidation
}

export default OrderValidations
