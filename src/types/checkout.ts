export interface Address {
    id: string
    name: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    isDefault: boolean
}

export interface ShippingMethod {
    id: string
    name: string
    description: string
    price: number
    estimatedDelivery: string
}

export interface PaymentMethod {
    id: string
    name: string
    description: string
    icon: string
}

export interface CheckoutFormValues {
    firstName: string
    lastName: string
    email: string
    phone: string
    saveInfo: boolean
    createAccount: boolean
    password?: string
    shippingAddressId: string
    billingAddressId: string
    shippingMethodId: string
    paymentMethodId: string
    cardNumber?: string
    cardName?: string
    cardExpiry?: string
    cardCvc?: string
    savePaymentMethod: boolean
}
