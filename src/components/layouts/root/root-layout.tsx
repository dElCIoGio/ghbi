import Navbar from "@/components/layouts/root/components/navbar";
import {Outlet} from "react-router";
import Footer from "@/components/layouts/root/components/footer";

function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-1 flex flex-col justify-center w-full">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default RootLayout;