import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {toast} from "sonner"
import {
    ArrowLeft,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Edit,
    Info,
    LockIcon,
    Plus,
    ShoppingCart,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Separator} from "@/components/ui/separator"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Progress} from "@/components/ui/progress"
import {addressSchema, checkoutSchema} from "@/lib/validations/checkout"
import type {CartItem, CartSummary} from "@/types/cart"
import type {Address, PaymentMethod, ShippingMethod} from "@/types/checkout"
import {Link} from "react-router";
import {z} from "zod";


export default function CheckoutPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [cartSummary, setCartSummary] = useState<CartSummary>({
        subtotal: 0,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: 0,
    })
    const [discountCode, setDiscountCode] = useState("")
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
    const [discountError, setDiscountError] = useState<string | null>(null)
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([])
    const [selectedShippingAddress, setSelectedShippingAddress] = useState<string | null>(null)
    const [selectedBillingAddress, setSelectedBillingAddress] = useState<string | null>(null)
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([])
    const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null)
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
    const [showAddAddressDialog, setShowAddAddressDialog] = useState(false)
    const [addressType, setAddressType] = useState<"shipping" | "billing">("shipping")
    const [sameBillingAddress, setSameBillingAddress] = useState(true)
    const [orderComplete, setOrderComplete] = useState(false)
    const [orderNumber, setOrderNumber] = useState("")

    // Initialize checkout form
    const checkoutForm = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            saveInfo: false,
            createAccount: false,
            password: "",
            shippingAddressId: "",
            billingAddressId: "",
            shippingMethodId: "",
            paymentMethodId: "",
            cardNumber: "",
            cardName: "",
            cardExpiry: "",
            cardCvc: "",
            savePaymentMethod: false,
        },
    })

    // Initialize address form
    const addressForm = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            id: "",
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            postalCode: "",
            country: "US",
            isDefault: false,
        },
    })

    // Sample data for cart items
    const sampleCartItems: CartItem[] = [
        {
            id: 1,
            productId: 1,
            name: "Silky Straight Lace Front Wig",
            slug: "silky-straight-lace-front-wig",
            image: "/placeholder.svg?height=400&width=300&text=Wig%201",
            price: 269.99,
            originalPrice: 299.99,
            quantity: 1,
            maxQuantity: 10,
            selectedColor: { id: 1, name: "Natural Black", value: "#0f0f0f", inStock: true },
            selectedLength: { id: 2, value: "16 inches", inStock: true },
            selectedTexture: { id: 1, name: "Silky Straight", value: "silky-straight", inStock: true },
            sku: "GHBI-LFW-001",
        },
        {
            id: 2,
            productId: 4,
            name: "Blonde Straight Clip-in Extensions",
            slug: "blonde-straight-clip-in-extensions",
            image: "/placeholder.svg?height=400&width=300&text=Extension%201",
            price: 159.99,
            quantity: 2,
            maxQuantity: 15,
            selectedColor: { id: 5, name: "Blonde", value: "#d4b16a", inStock: true },
            selectedLength: { id: 3, value: "20 inches", inStock: true },
            selectedTexture: { id: 1, name: "Silky Straight", value: "silky-straight", inStock: true },
            sku: "GHBI-EXT-004",
        },
    ]

    // Sample data for shipping methods
    const sampleShippingMethods: ShippingMethod[] = [
        {
            id: "standard",
            name: "Standard Shipping",
            description: "Delivery in 5-7 business days",
            price: 9.99,
            estimatedDelivery: "5-7 business days",
        },
        {
            id: "express",
            name: "Express Shipping",
            description: "Delivery in 2-3 business days",
            price: 19.99,
            estimatedDelivery: "2-3 business days",
        },
        {
            id: "overnight",
            name: "Overnight Shipping",
            description: "Next business day delivery",
            price: 29.99,
            estimatedDelivery: "Next business day",
        },
    ]

    // Sample data for payment methods
    const samplePaymentMethods: PaymentMethod[] = [
        {
            id: "credit-card",
            name: "Credit Card",
            description: "Pay with Visa, Mastercard, American Express, or Discover",
            icon: "credit-card",
        },
        {
            id: "paypal",
            name: "PayPal",
            description: "Fast, secure payment with PayPal",
            icon: "paypal",
        },
        {
            id: "apple-pay",
            name: "Apple Pay",
            description: "Quick and secure payment with Apple Pay",
            icon: "apple-pay",
        },
    ]

    // Sample data for saved addresses (for authenticated users)
    const sampleSavedAddresses: Address[] = [
        {
            id: "address-1",
            name: "Home",
            addressLine1: "123 Main Street",
            addressLine2: "Apt 4B",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
            country: "US",
            isDefault: true,
        },
        {
            id: "address-2",
            name: "Work",
            addressLine1: "456 Office Plaza",
            addressLine2: "Suite 200",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90012",
            country: "US",
            isDefault: false,
        },
    ]

    // Load cart data and check authentication status
    useEffect(() => {
        // Simulate API call to fetch cart data and check authentication
        const fetchData = async () => {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // Check if user is authenticated (simulated)
                const userAuth = Math.random() > 0.5 // Randomly determine auth status for demo
                setIsAuthenticated(userAuth)

                // Set cart items
                setCartItems(sampleCartItems)

                // Calculate cart summary
                const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
                const shipping = 0 // Will be set when shipping method is selected
                const tax = subtotal * 0.08 // 8% tax rate
                const total = subtotal + shipping + tax

                setCartSummary({
                    subtotal,
                    shipping,
                    tax,
                    discount: 0,
                    total,
                })

                // Set shipping methods
                setShippingMethods(sampleShippingMethods)

                // Set payment methods
                setPaymentMethods(samplePaymentMethods)

                // If authenticated, set saved addresses
                if (userAuth) {
                    setSavedAddresses(sampleSavedAddresses)

                    // Pre-fill form with user data
                    checkoutForm.setValue("firstName", "Jane")
                    checkoutForm.setValue("lastName", "Doe")
                    checkoutForm.setValue("email", "jane.doe@example.com")
                    checkoutForm.setValue("phone", "555-123-4567")

                    // Set default shipping address if available
                    const defaultAddress = sampleSavedAddresses.find((address) => address.isDefault)
                    if (defaultAddress) {
                        setSelectedShippingAddress(defaultAddress.id)
                        checkoutForm.setValue("shippingAddressId", defaultAddress.id)

                        // Also set as billing address if same billing address is checked
                        if (sameBillingAddress) {
                            setSelectedBillingAddress(defaultAddress.id)
                            checkoutForm.setValue("billingAddressId", defaultAddress.id)
                        }
                    }
                }

                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching data:", error)
                toast.error("Failed to load checkout data")
                setIsLoading(false)
            }
        }

        fetchData()
    }, [checkoutForm])

    // Update cart summary when shipping method changes
    useEffect(() => {
        if (selectedShippingMethod) {
            const selectedMethod = shippingMethods.find((method) => method.id === selectedShippingMethod)
            if (selectedMethod) {
                setCartSummary((prev) => ({
                    ...prev,
                    shipping: selectedMethod.price,
                    total: prev.subtotal + selectedMethod.price + prev.tax - prev.discount,
                }))
            }
        }
    }, [selectedShippingMethod, shippingMethods])

    // Handle shipping address selection
    const handleShippingAddressSelect = (addressId: string) => {
        setSelectedShippingAddress(addressId)
        checkoutForm.setValue("shippingAddressId", addressId)

        // If same billing address is checked, also set billing address
        if (sameBillingAddress) {
            setSelectedBillingAddress(addressId)
            checkoutForm.setValue("billingAddressId", addressId)
        }
    }

    // Handle billing address selection
    const handleBillingAddressSelect = (addressId: string) => {
        setSelectedBillingAddress(addressId)
        checkoutForm.setValue("billingAddressId", addressId)
    }

    // Handle shipping method selection
    const handleShippingMethodSelect = (methodId: string) => {
        setSelectedShippingMethod(methodId)
        checkoutForm.setValue("shippingMethodId", methodId)
    }

    // Handle payment method selection
    const handlePaymentMethodSelect = (methodId: string) => {
        setSelectedPaymentMethod(methodId)
        checkoutForm.setValue("paymentMethodId", methodId)
    }

    // Handle same billing address toggle
    const handleSameBillingAddressToggle = (checked: boolean) => {
        setSameBillingAddress(checked)

        if (checked && selectedShippingAddress) {
            setSelectedBillingAddress(selectedShippingAddress)
            checkoutForm.setValue("billingAddressId", selectedShippingAddress)
        } else {
            setSelectedBillingAddress(null)
            checkoutForm.setValue("billingAddressId", "")
        }
    }

    // Handle add new address
    const handleAddAddress = async (data: z.infer<typeof addressSchema>) => {
        try {
            // Simulate API call to add address
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Generate a unique ID for the new address
            const newAddress: Address = {
                ...data,
                id: `address-${Date.now()}`,
            }

            // Add the new address to saved addresses
            setSavedAddresses((prev) => [...prev, newAddress])

            // Select the new address
            if (addressType === "shipping") {
                setSelectedShippingAddress(newAddress.id)
                checkoutForm.setValue("shippingAddressId", newAddress.id)

                // If same billing address is checked, also set billing address
                if (sameBillingAddress) {
                    setSelectedBillingAddress(newAddress.id)
                    checkoutForm.setValue("billingAddressId", newAddress.id)
                }
            } else {
                setSelectedBillingAddress(newAddress.id)
                checkoutForm.setValue("billingAddressId", newAddress.id)
            }

            // Close the dialog
            setShowAddAddressDialog(false)

            // Reset the form
            addressForm.reset()

            toast.success("Address added successfully")
        } catch (error) {
            console.error("Error adding address:", error)
            toast.error("Failed to add address")
        }
    }

    // Handle apply discount code
    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            setDiscountError("Please enter a discount code")
            return
        }

        setIsApplyingDiscount(true)
        setDiscountError(null)

        try {
            // Simulate API call to validate discount code
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, accept any code that starts with "GHBI"
            if (discountCode.toUpperCase().startsWith("GHBI")) {
                // Apply a 10% discount
                const discountAmount = cartSummary.subtotal * 0.1

                setCartSummary((prev) => ({
                    ...prev,
                    discount: discountAmount,
                    total: prev.subtotal + prev.shipping + prev.tax - discountAmount,
                }))

                toast.success("Discount applied successfully")
                setDiscountCode("")
            } else {
                setDiscountError("Invalid discount code")
            }
        } catch (error) {
            console.error("Error applying discount:", error)
            setDiscountError("Failed to apply discount code")
        } finally {
            setIsApplyingDiscount(false)
        }
    }

    // Handle remove discount
    const handleRemoveDiscount = () => {
        setCartSummary((prev) => ({
            ...prev,
            discount: 0,
            total: prev.subtotal + prev.shipping + prev.tax,
        }))

        toast.success("Discount removed")
    }

    // Handle continue to next step
    const handleContinue = async () => {
        // Validate current step
        let isValid = false

        if (currentStep === 1) {
            // Validate contact information
            isValid = await checkoutForm.trigger(["firstName", "lastName", "email", "phone"])
        } else if (currentStep === 2) {
            // Validate shipping information
            const result = await checkoutForm.trigger(["shippingAddressId", "shippingMethodId"])
            isValid = result && !!selectedShippingAddress && !!selectedShippingMethod

            // If same billing address is not checked, also validate billing address
            if (!sameBillingAddress) {
                const billingResult = await checkoutForm.trigger(["billingAddressId"])
                isValid = isValid && billingResult && !!selectedBillingAddress
            }
        } else if (currentStep === 3) {
            // Validate payment information
            const result = await checkoutForm.trigger(["paymentMethodId"])
            isValid = result && !!selectedPaymentMethod

            // If credit card is selected, also validate card details
            if (selectedPaymentMethod === "credit-card") {
                const cardResult = await checkoutForm.trigger(["cardNumber", "cardName", "cardExpiry", "cardCvc"])
                isValid = isValid && cardResult
            }
        }

        if (isValid) {
            // Move to next step
            setCurrentStep((prev) => prev + 1)

            // Scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    // Handle go back to previous step
    const handleGoBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1))

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Handle place order
    const handlePlaceOrder = async () => {
        try {
            setIsSubmitting(true)

            // Get all form values
            // const formValues = checkoutForm.getValues()

            // Simulate API call to place order
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Generate a random order number
            const generatedOrderNumber = `GHBI-${Math.floor(100000 + Math.random() * 900000)}`
            setOrderNumber(generatedOrderNumber)

            // Set order complete
            setOrderComplete(true)

            // Scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" })
        } catch (error) {
            console.error("Error placing order:", error)
            toast.error("Failed to place order. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Format price
    const formatPrice = (price: number) => {
        return price.toFixed(2)
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    }

    // If loading, show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className=" max-w-6xl py-8 px-4 md:py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-full max-w-md">
                            <div className="h-8 w-40 bg-muted rounded-md animate-pulse mb-8"></div>
                            <div className="space-y-6">
                                <div className="h-64 bg-muted rounded-md animate-pulse"></div>
                                <div className="h-64 bg-muted rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // If cart is empty, show empty cart message
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className=" max-w-6xl py-8 px-4 md:py-12">
                    <div className="flex flex-col items-center justify-center space-y-6 py-12">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Your cart is empty</h1>
                        <p className="text-muted-foreground max-w-md text-center">
                            Looks like you haven't added any products to your cart yet. Browse our collection to find the perfect hair
                            products for you.
                        </p>
                        <Button size="lg" asChild>
                            <Link to="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    // If order is complete, show order confirmation
    if (orderComplete) {
        return (
            <div className="flex-1 bg-background">
                <div className=" py-8 px-4 md:py-12">
                    <motion.div
                        className="flex flex-col items-center justify-center space-y-6 py-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="rounded-full bg-green-100 p-6">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-center">Order Confirmed!</h1>
                        <p className="text-muted-foreground max-w-md text-center">
                            Thank you for your order. We've received your payment and will process your order shortly.
                        </p>

                        <div className="w-full p-6 border rounded-lg bg-muted/10 my-6">
                            <div className="flex justify-between mb-4">
                                <span className="text-muted-foreground">Order Number:</span>
                                <span className="font-medium">{orderNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Order Date:</span>
                                <span className="font-medium">{new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <h2 className="text-xl font-semibold">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b">
                                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={item.image || "/placeholder.svg"} alt={item.name}
                                                 className="object-cover h-full w-full"/>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <div className="text-sm text-muted-foreground">
                                                <p>
                                                    {item.selectedColor.name} / {item.selectedLength.value} / {item.selectedTexture.name}
                                                </p>
                                                <p>Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">${formatPrice(item.price * item.quantity)}</p>
                                            {item.originalPrice && (
                                                <p className="text-sm text-muted-foreground line-through">
                                                    ${formatPrice(item.originalPrice * item.quantity)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${formatPrice(cartSummary.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${formatPrice(cartSummary.shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${formatPrice(cartSummary.tax)}</span>
                                </div>
                                {cartSummary.discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-${formatPrice(cartSummary.discount)}</span>
                                    </div>
                                )}
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${formatPrice(cartSummary.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
                            <Button variant="outline" size="lg" className="flex-1" asChild>
                                <Link to="/shop">Continue Shopping</Link>
                            </Button>
                            <Button size="lg" className="flex-1" asChild>
                                <Link to="/account/orders">View My Orders</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 w-full bg-background">
            <div className=" py-8 px-4 md:py-12">
                <div className="mb-8">
                    <Link
                        to="/cart"
                        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                    </Link>

                    <h1 className="text-3xl font-bold mt-4">Checkout</h1>

                    {/* Checkout Progress */}
                    <div className="mt-6 mb-8">
                        <div className="flex justify-between mb-2">
              <span className={`text-sm font-medium ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                Contact
              </span>
                            <span className={`text-sm font-medium ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                Shipping
              </span>
                            <span className={`text-sm font-medium ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                Payment
              </span>
                            <span className={`text-sm font-medium ${currentStep >= 4 ? "text-primary" : "text-muted-foreground"}`}>
                Review
              </span>
                        </div>
                        <Progress value={currentStep * 25} className="h-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Checkout Form */}
                    <div className="lg:col-span-2">
                        <Form {...checkoutForm}>
                            <form className="space-y-8">
                                {/* Step 1: Contact Information */}
                                {currentStep === 1 && (
                                    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

                                            {!isAuthenticated && (
                                                <div className="mb-6">
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        Already have an account?{" "}
                                                        <Link to="/auth/login" className="text-primary hover:underline">
                                                            Log in
                                                        </Link>
                                                    </p>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="firstName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>First Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter your first name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="lastName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Last Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter your last name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" placeholder="Enter your email address" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone Number</FormLabel>
                                                            <FormControl>
                                                                <Input type="tel" placeholder="Enter your phone number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {!isAuthenticated && (
                                                <div className="space-y-4 mt-6">
                                                    <FormField
                                                        control={checkoutForm.control}
                                                        name="saveInfo"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>Save this information for next time</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={checkoutForm.control}
                                                        name="createAccount"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value}
                                                                        onCheckedChange={(checked) => {
                                                                            field.onChange(checked)
                                                                            // If checked, also set saveInfo to true
                                                                            if (checked) {
                                                                                checkoutForm.setValue("saveInfo", true)
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>Create an account for faster checkout</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {checkoutForm.watch("createAccount") && (
                                                        <FormField
                                                            control={checkoutForm.control}
                                                            name="password"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Password</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="password" placeholder="Create a password" {...field} />
                                                                    </FormControl>
                                                                    <FormDescription>Password must be at least 8 characters long</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-end">
                                            <Button type="button" onClick={handleContinue}>
                                                Continue to Shipping
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Shipping Information */}
                                {currentStep === 2 && (
                                    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
                                        {/* Shipping Address */}
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

                                            {isAuthenticated && savedAddresses.length > 0 ? (
                                                <div className="space-y-4">
                                                    <RadioGroup value={selectedShippingAddress || ""} onValueChange={handleShippingAddressSelect}>
                                                        {savedAddresses.map((address) => (
                                                            <div
                                                                key={address.id}
                                                                className={`flex items-start space-x-3 p-4 rounded-md border ${
                                                                    selectedShippingAddress === address.id
                                                                        ? "border-primary bg-primary/5"
                                                                        : "border-muted"
                                                                }`}
                                                            >
                                                                <RadioGroupItem value={address.id} id={`shipping-${address.id}`} className="mt-1" />
                                                                <div className="flex-1">
                                                                    <label
                                                                        htmlFor={`shipping-${address.id}`}
                                                                        className="font-medium cursor-pointer flex justify-between"
                                                                    >
                                                                        <span>{address.name}</span>
                                                                        {address.isDefault && (
                                                                            <span className="text-xs bg-muted px-2 py-1 rounded-full">Default</span>
                                                                        )}
                                                                    </label>
                                                                    <p className="text-sm text-muted-foreground mt-1">
                                                                        {address.addressLine1}
                                                                        {address.addressLine2 && `, ${address.addressLine2}`}
                                                                        <br />
                                                                        {address.city}, {address.state} {address.postalCode}
                                                                        <br />
                                                                        {address.country === "US" ? "United States" : address.country}
                                                                    </p>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                        <Edit className="h-4 w-4" />
                                                                        <span className="sr-only">Edit</span>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </RadioGroup>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="mt-2"
                                                        onClick={() => {
                                                            setAddressType("shipping")
                                                            setShowAddAddressDialog(true)
                                                        }}
                                                    >
                                                        <Plus className="mr-2 h-4 w-4" />
                                                        Add New Address
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        Please enter your shipping address below.
                                                    </p>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setAddressType("shipping")
                                                            setShowAddAddressDialog(true)
                                                        }}
                                                    >
                                                        <Plus className="mr-2 h-4 w-4" />
                                                        Add Shipping Address
                                                    </Button>
                                                </div>
                                            )}

                                            {!selectedShippingAddress && (
                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="shippingAddressId"
                                                    render={({ field }) => (
                                                        <FormItem className="hidden">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>

                                        {/* Billing Address */}
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <div className="flex items-center justify-between mb-4">
                                                <h2 className="text-xl font-semibold">Billing Address</h2>

                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="same-address"
                                                        checked={sameBillingAddress}
                                                        onCheckedChange={handleSameBillingAddressToggle}
                                                    />
                                                    <label htmlFor="same-address" className="text-sm font-medium leading-none cursor-pointer">
                                                        Same as shipping address
                                                    </label>
                                                </div>
                                            </div>

                                            {!sameBillingAddress && (
                                                <div className="space-y-4 mt-4">
                                                    {isAuthenticated && savedAddresses.length > 0 ? (
                                                        <div className="space-y-4">
                                                            <RadioGroup
                                                                value={selectedBillingAddress || ""}
                                                                onValueChange={handleBillingAddressSelect}
                                                            >
                                                                {savedAddresses.map((address) => (
                                                                    <div
                                                                        key={`billing-${address.id}`}
                                                                        className={`flex items-start space-x-3 p-4 rounded-md border ${
                                                                            selectedBillingAddress === address.id
                                                                                ? "border-primary bg-primary/5"
                                                                                : "border-muted"
                                                                        }`}
                                                                    >
                                                                        <RadioGroupItem value={address.id} id={`billing-${address.id}`} className="mt-1" />
                                                                        <div className="flex-1">
                                                                            <label
                                                                                htmlFor={`billing-${address.id}`}
                                                                                className="font-medium cursor-pointer flex justify-between"
                                                                            >
                                                                                <span>{address.name}</span>
                                                                                {address.isDefault && (
                                                                                    <span className="text-xs bg-muted px-2 py-1 rounded-full">Default</span>
                                                                                )}
                                                                            </label>
                                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                                {address.addressLine1}
                                                                                {address.addressLine2 && `, ${address.addressLine2}`}
                                                                                <br />
                                                                                {address.city}, {address.state} {address.postalCode}
                                                                                <br />
                                                                                {address.country === "US" ? "United States" : address.country}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </RadioGroup>

                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="mt-2"
                                                                onClick={() => {
                                                                    setAddressType("billing")
                                                                    setShowAddAddressDialog(true)
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add New Address
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <p className="text-sm text-muted-foreground mb-4">
                                                                Please enter your billing address below.
                                                            </p>

                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    setAddressType("billing")
                                                                    setShowAddAddressDialog(true)
                                                                }}
                                                            >
                                                                <Plus className="mr-2 h-4 w-4" />
                                                                Add Billing Address
                                                            </Button>
                                                        </div>
                                                    )}

                                                    {!selectedBillingAddress && !sameBillingAddress && (
                                                        <FormField
                                                            control={checkoutForm.control}
                                                            name="billingAddressId"
                                                            render={({ field }) => (
                                                                <FormItem className="hidden">
                                                                    <FormControl>
                                                                        <Input {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Shipping Method */}
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>

                                            <RadioGroup
                                                value={selectedShippingMethod || ""}
                                                onValueChange={handleShippingMethodSelect}
                                                className="space-y-3"
                                            >
                                                {shippingMethods.map((method) => (
                                                    <div
                                                        key={method.id}
                                                        className={`flex items-start space-x-3 p-4 rounded-md border ${
                                                            selectedShippingMethod === method.id ? "border-primary bg-primary/5" : "border-muted"
                                                        }`}
                                                    >
                                                        <RadioGroupItem value={method.id} id={`shipping-method-${method.id}`} className="mt-1" />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between">
                                                                <label htmlFor={`shipping-method-${method.id}`} className="font-medium cursor-pointer">
                                                                    {method.name}
                                                                </label>
                                                                <span className="font-medium">${formatPrice(method.price)}</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                Estimated delivery: {method.estimatedDelivery}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </RadioGroup>

                                            {!selectedShippingMethod && (
                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="shippingMethodId"
                                                    render={({ field }) => (
                                                        <FormItem className="hidden">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}
                                        </div>

                                        <div className="flex justify-between">
                                            <Button type="button" variant="outline" onClick={handleGoBack}>
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Back
                                            </Button>
                                            <Button type="button" onClick={handleContinue}>
                                                Continue to Payment
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Payment Information */}
                                {currentStep === 3 && (
                                    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                                            <RadioGroup
                                                value={selectedPaymentMethod || ""}
                                                onValueChange={handlePaymentMethodSelect}
                                                className="space-y-3"
                                            >
                                                {paymentMethods.map((method) => (
                                                    <div
                                                        key={method.id}
                                                        className={`flex items-start space-x-3 p-4 rounded-md border ${
                                                            selectedPaymentMethod === method.id ? "border-primary bg-primary/5" : "border-muted"
                                                        }`}
                                                    >
                                                        <RadioGroupItem value={method.id} id={`payment-method-${method.id}`} className="mt-1" />
                                                        <div className="flex-1">
                                                            <label htmlFor={`payment-method-${method.id}`} className="font-medium cursor-pointer">
                                                                {method.name}
                                                            </label>
                                                            <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            {method.icon === "credit-card" && (
                                                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                                            )}
                                                            {method.icon === "paypal" && (
                                                                <div className="text-[#003087] font-bold text-lg">
                                                                    Pay<span className="text-[#009cde]">Pal</span>
                                                                </div>
                                                            )}
                                                            {method.icon === "apple-pay" && <div className="text-black font-semibold">Apple Pay</div>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </RadioGroup>

                                            {!selectedPaymentMethod && (
                                                <FormField
                                                    control={checkoutForm.control}
                                                    name="paymentMethodId"
                                                    render={({ field }) => (
                                                        <FormItem className="hidden">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )}

                                            {/* Credit Card Details */}
                                            {selectedPaymentMethod === "credit-card" && (
                                                <div className="mt-6 space-y-4">
                                                    <FormField
                                                        control={checkoutForm.control}
                                                        name="cardNumber"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Card Number</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="1234 5678 9012 3456"
                                                                        {...field}
                                                                        onChange={(e) => {
                                                                            // Format card number with spaces
                                                                            const value = e.target.value.replace(/\s/g, "")
                                                                            const formattedValue = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
                                                                            field.onChange(formattedValue)
                                                                        }}
                                                                        maxLength={19} // 16 digits + 3 spaces
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={checkoutForm.control}
                                                        name="cardName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Name on Card</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="John Doe" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField
                                                            control={checkoutForm.control}
                                                            name="cardExpiry"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Expiration Date</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="MM/YY"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                // Format expiry date
                                                                                const value = e.target.value.replace(/\D/g, "")
                                                                                let formattedValue = value
                                                                                if (value.length > 2) {
                                                                                    formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                                                                                }
                                                                                field.onChange(formattedValue)
                                                                            }}
                                                                            maxLength={5} // MM/YY
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={checkoutForm.control}
                                                            name="cardCvc"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>CVC</FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            placeholder="123"
                                                                            {...field}
                                                                            onChange={(e) => {
                                                                                // Only allow numbers
                                                                                const value = e.target.value.replace(/\D/g, "")
                                                                                field.onChange(value)
                                                                            }}
                                                                            maxLength={4}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={checkoutForm.control}
                                                        name="savePaymentMethod"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                                                <FormControl>
                                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                                </FormControl>
                                                                <div className="space-y-1 leading-none">
                                                                    <FormLabel>Save this payment method for future purchases</FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between">
                                            <Button type="button" variant="outline" onClick={handleGoBack}>
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Back
                                            </Button>
                                            <Button type="button" onClick={handleContinue}>
                                                Review Order
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Review Order */}
                                {currentStep === 4 && (
                                    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>

                                            <div className="space-y-6">
                                                {/* Contact Information */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-medium">Contact Information</h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8"
                                                            onClick={() => setCurrentStep(1)}
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <div className="bg-muted/30 p-4 rounded-md">
                                                        <p>
                                                            {checkoutForm.getValues("firstName")} {checkoutForm.getValues("lastName")}
                                                        </p>
                                                        <p>{checkoutForm.getValues("email")}</p>
                                                        <p>{checkoutForm.getValues("phone")}</p>
                                                    </div>
                                                </div>

                                                {/* Shipping Information */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-medium">Shipping Information</h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8"
                                                            onClick={() => setCurrentStep(2)}
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <div className="bg-muted/30 p-4 rounded-md">
                                                        {selectedShippingAddress && (
                                                            <div>
                                                                {(() => {
                                                                    const address = savedAddresses.find((a) => a.id === selectedShippingAddress)
                                                                    if (address) {
                                                                        return (
                                                                            <>
                                                                                <p className="font-medium">{address.name}</p>
                                                                                <p>
                                                                                    {address.addressLine1}
                                                                                    {address.addressLine2 && `, ${address.addressLine2}`}
                                                                                </p>
                                                                                <p>
                                                                                    {address.city}, {address.state} {address.postalCode}
                                                                                </p>
                                                                                <p>{address.country === "US" ? "United States" : address.country}</p>
                                                                            </>
                                                                        )
                                                                    }
                                                                    return <p>No shipping address selected</p>
                                                                })()}
                                                            </div>
                                                        )}

                                                        {selectedShippingMethod && (
                                                            <div className="mt-4 pt-4 border-t border-muted">
                                                                <p className="font-medium">Shipping Method</p>
                                                                {(() => {
                                                                    const method = shippingMethods.find((m) => m.id === selectedShippingMethod)
                                                                    if (method) {
                                                                        return (
                                                                            <>
                                                                                <p>
                                                                                    {method.name} - ${formatPrice(method.price)}
                                                                                </p>
                                                                                <p className="text-sm text-muted-foreground">
                                                                                    Estimated delivery: {method.estimatedDelivery}
                                                                                </p>
                                                                            </>
                                                                        )
                                                                    }
                                                                    return <p>No shipping method selected</p>
                                                                })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Billing Information */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-medium">Billing Information</h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8"
                                                            onClick={() => setCurrentStep(2)}
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <div className="bg-muted/30 p-4 rounded-md">
                                                        {sameBillingAddress ? (
                                                            <p className="italic">Same as shipping address</p>
                                                        ) : (
                                                            selectedBillingAddress && (
                                                                <div>
                                                                    {(() => {
                                                                        const address = savedAddresses.find((a) => a.id === selectedBillingAddress)
                                                                        if (address) {
                                                                            return (
                                                                                <>
                                                                                    <p className="font-medium">{address.name}</p>
                                                                                    <p>
                                                                                        {address.addressLine1}
                                                                                        {address.addressLine2 && `, ${address.addressLine2}`}
                                                                                    </p>
                                                                                    <p>
                                                                                        {address.city}, {address.state} {address.postalCode}
                                                                                    </p>
                                                                                    <p>{address.country === "US" ? "United States" : address.country}</p>
                                                                                </>
                                                                            )
                                                                        }
                                                                        return <p>No billing address selected</p>
                                                                    })()}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Payment Information */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-medium">Payment Information</h3>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8"
                                                            onClick={() => setCurrentStep(3)}
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <div className="bg-muted/30 p-4 rounded-md">
                                                        {selectedPaymentMethod && (
                                                            <div>
                                                                {(() => {
                                                                    const method = paymentMethods.find((m) => m.id === selectedPaymentMethod)
                                                                    if (method) {
                                                                        if (method.id === "credit-card") {
                                                                            const cardNumber = checkoutForm.getValues("cardNumber") || ""
                                                                            const lastFourDigits = cardNumber.replace(/\s/g, "").slice(-4)

                                                                            return (
                                                                                <div className="flex items-center justify-between">
                                                                                    <div>
                                                                                        <p className="font-medium">{method.name}</p>
                                                                                        <p>•••• •••• •••• {lastFourDigits || "****"}</p>
                                                                                        <p className="text-sm text-muted-foreground">
                                                                                            {checkoutForm.getValues("cardName") || "Card Holder"}
                                                                                        </p>
                                                                                    </div>
                                                                                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                                                                                </div>
                                                                            )
                                                                        } else if (method.id === "paypal") {
                                                                            return (
                                                                                <div className="flex items-center justify-between">
                                                                                    <p className="font-medium">{method.name}</p>
                                                                                    <div className="text-[#003087] font-bold text-lg">
                                                                                        Pay<span className="text-[#009cde]">Pal</span>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        } else if (method.id === "apple-pay") {
                                                                            return (
                                                                                <div className="flex items-center justify-between">
                                                                                    <p className="font-medium">{method.name}</p>
                                                                                    <div className="text-black font-semibold">Apple Pay</div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        return <p>{method.name}</p>
                                                                    }
                                                                    return <p>No payment method selected</p>
                                                                })()}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-lg border shadow-sm">
                                            <h2 className="text-xl font-semibold mb-4">Order Items</h2>

                                            <div className="space-y-4">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex gap-4 py-4 border-b">
                                                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={item.image || "/placeholder.svg"}
                                                                alt={item.name}
                                                                style={{
                                                                    objectFit: "cover",
                                                                    width: "100%",
                                                                    height: "100%"
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-medium">{item.name}</h3>
                                                            <div className="text-sm text-muted-foreground">
                                                                <p>
                                                                    {item.selectedColor.name} / {item.selectedLength.value} / {item.selectedTexture.name}
                                                                </p>
                                                                <p>Quantity: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium">${formatPrice(item.price * item.quantity)}</p>
                                                            {item.originalPrice && (
                                                                <p className="text-sm text-muted-foreground line-through">
                                                                    ${formatPrice(item.originalPrice * item.quantity)}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Alert className="bg-muted/30 border-muted">
                                            <Info className="h-4 w-4" />
                                            <AlertTitle>Important</AlertTitle>
                                            <AlertDescription>
                                                By placing your order, you agree to our{" "}
                                                <Link to="/terms" className="text-primary hover:underline">
                                                    Terms of Service
                                                </Link>{" "}
                                                and{" "}
                                                <Link to="/privacy" className="text-primary hover:underline">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </AlertDescription>
                                        </Alert>

                                        <div className="flex justify-between">
                                            <Button type="button" variant="outline" onClick={handleGoBack}>
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Back
                                            </Button>
                                            <Button
                                                type="button"
                                                onClick={handlePlaceOrder}
                                                disabled={isSubmitting}
                                                className="min-w-[150px]"
                                            >
                                                {isSubmitting ? "Processing..." : "Place Order"}
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </Form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-24">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                            <div className="space-y-4">
                                <Accordion type="single" collapsible defaultValue="items">
                                    <AccordionItem value="items" className="border-b-0">
                                        <AccordionTrigger className="py-2">
                      <span className="flex items-center">
                        Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                      </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3 mb-4">
                                                {cartItems.map((item) => (
                                                    <div key={item.id} className="flex justify-between text-sm">
                                                        <div className="flex-1">
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-medium">${formatPrice(item.price * item.quantity)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${formatPrice(cartSummary.subtotal)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        {cartSummary.shipping > 0 ? (
                                            <span>${formatPrice(cartSummary.shipping)}</span>
                                        ) : (
                                            <span className="text-muted-foreground">Calculated at next step</span>
                                        )}
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax (8%)</span>
                                        <span>${formatPrice(cartSummary.tax)}</span>
                                    </div>

                                    {cartSummary.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${formatPrice(cartSummary.discount)}</span>
                                        </div>
                                    )}
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${formatPrice(cartSummary.total)}</span>
                                </div>

                                {/* Discount Code */}
                                <div className="pt-4">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="discount" className="border-b-0">
                                            <AccordionTrigger className="py-2">
                                                <span className="text-sm">Apply Discount Code</span>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {cartSummary.discount > 0 ? (
                                                    <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-md p-3">
                                                        <div className="flex items-center">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                                                            <div>
                                                                <div className="font-medium">Discount Applied</div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    ${formatPrice(cartSummary.discount)} off your order
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="sm" onClick={handleRemoveDiscount} className="h-8 text-xs">
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <div className="flex gap-2">
                                                            <Input
                                                                placeholder="Enter discount code"
                                                                value={discountCode}
                                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                                className="h-9"
                                                            />
                                                            <Button
                                                                onClick={handleApplyDiscount}
                                                                disabled={isApplyingDiscount || !discountCode.trim()}
                                                                className="h-9"
                                                            >
                                                                Apply
                                                            </Button>
                                                        </div>
                                                        {discountError && <p className="text-sm text-destructive">{discountError}</p>}
                                                    </div>
                                                )}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                {/* Security Badge */}
                                <div className="pt-4 flex items-center justify-center">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <LockIcon className="h-3 w-3 mr-1" />
                                        <span>Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Address Dialog */}
            <Dialog open={showAddAddressDialog} onOpenChange={setShowAddAddressDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>Enter your address details below.</DialogDescription>
                    </DialogHeader>

                    <Form {...addressForm}>
                        <form onSubmit={addressForm.handleSubmit(handleAddAddress)} className="space-y-4">
                            <FormField
                                control={addressForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Home, Work, etc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addressForm.control}
                                name="addressLine1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Line 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Street address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={addressForm.control}
                                name="addressLine2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Apartment, suite, unit, etc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={addressForm.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State / Province</FormLabel>
                                            <FormControl>
                                                <Input placeholder="State" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={addressForm.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Postal code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={addressForm.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="US">United States</SelectItem>
                                                    <SelectItem value="CA">Canada</SelectItem>
                                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                                    <SelectItem value="AU">Australia</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={addressForm.control}
                                name="isDefault"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Set as default address</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setShowAddAddressDialog(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Save Address</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
