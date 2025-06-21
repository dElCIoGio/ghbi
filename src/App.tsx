import {Routes, Route, useLocation} from "react-router";
import RootLayout from "@/components/layouts/root/root-layout";
import LandingPage from "@/pages/landing-page";
import AboutUs from "@/pages/about-us";
import Listing from "@/pages/shop/listing";
import ProductPage from "@/pages/shop/item";
import CartPage from "@/pages/cart";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import LoginPage from "@/pages/auth/login";
import ResetPasswordPage from "@/pages/auth/reset-password";
import SignUpPage from "@/pages/auth/sign-up";
import VerifyPage from "@/pages/auth/verify";
import ContactPage from "@/pages/contact";
import {useEffect} from "react";
import Test from "@/pages/test";


function App() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="font-poppins">
            <Routes>
                <Route path="test" element={<Test/>}/>

                {/* Root */}
                <Route path="/" element={<RootLayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="about-us" element={<AboutUs/>}/>
                    <Route path="shop">
                        <Route index element={<Listing/>}/>
                        <Route path=":productId" element={<ProductPage/>}/>
                    </Route>
                    <Route path="c" element={<CartPage/>}/>
                    <Route path="contact" element={<ContactPage/>}/>

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