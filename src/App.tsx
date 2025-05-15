import {Routes, Route} from "react-router";
import RootLayout from "@/components/layouts/root/root-layout.tsx";
import LandingPage from "@/pages/landing-page.tsx";
import AboutUs from "@/pages/about-us.tsx";
import Listing from "@/pages/shop/listing.tsx";
import ProductPage from "@/pages/shop/item.tsx";
import CartPage from "@/pages/cart.tsx";

function App() {
    return (
        <div>
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

                </Route>


            </Routes>
        </div>
    );
}

export default App;