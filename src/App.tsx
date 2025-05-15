import {Routes, Route, useLocation} from "react-router";
import RootLayout from "@/components/layouts/root/root-layout.tsx";
import LandingPage from "@/pages/landing-page.tsx";
import AboutUs from "@/pages/about-us.tsx";
import Listing from "@/pages/shop/listing.tsx";
import ProductPage from "@/pages/shop/item.tsx";
import CartPage from "@/pages/cart.tsx";
import ForgotPasswordPage from "@/pages/auth/forgot-password.tsx";
import LoginPage from "@/pages/auth/login.tsx";
import ResetPasswordPage from "@/pages/auth/reset-password.tsx";
import SignUpPage from "@/pages/auth/sign-up.tsx";
import VerifyPage from "@/pages/auth/verify.tsx";
import ContactPage from "@/pages/contact.tsx";
import {useEffect} from "react";
import CheckoutPage from "@/pages/checkout.tsx";

function App() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="font-poppins">
            <Routes>

                {/* Root */}
                <Route path="/" element={<RootLayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="shop">
                        <Route index element={<Listing/>}/>
                        <Route path=":productId" element={<ProductPage/>}/>
                    </Route>
                    <Route path="cart" element={<CartPage/>}/>
                    <Route path="contact" element={<ContactPage/>}/>
                    <Route path="checkout" element={<CheckoutPage/>}/>

                    <Route path="auth">
                        <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="sign-up" element={<SignUpPage/>}/>
                        <Route path="reset-password" element={<ResetPasswordPage/>}/>
                        <Route path="verify-email" element={<VerifyPage/>}/>

                    </Route>

                </Route>


            </Routes>
        </div>
    );
}

export default App;