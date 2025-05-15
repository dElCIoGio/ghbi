import {Routes, Route} from "react-router";
import RootLayout from "@/components/layouts/root/root-layout.tsx";
import LandingPage from "@/pages/landing-page.tsx";
import AboutUs from "@/pages/about-us.tsx";

function App() {
    return (
        <div>
            <Routes>

                {/* Root */}
                <Route path="/" element={<RootLayout/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="about-us" element={<AboutUs/>}/>
                </Route>


            </Routes>
        </div>
    );
}

export default App;