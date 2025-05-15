import {Bag, UserCircle, List} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";

const navlinks: {
    name: string,
    href: string,
}[] = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'About',
        href: '/about-us'
    },
    {
        name: 'Contact',
        href: '/contact'
    },
]

function Navbar() {

    const isMobile = useIsMobile();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-md">
            <Header/>
            <div className="flex w-full items-center justify-between py-2 px-4">
                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-black">
                                <List className="w-6 h-6"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col space-y-4 mt-8">
                                {navlinks.map(link => (
                                    <Button asChild variant="ghost" key={link.href} className="justify-start">
                                        <Link to={link.href} className="text-base font-jost font-medium">
                                            {link.name}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>


                <div className={`flex w-full items-center ${isMobile ? "justify-center" : "justify-between"}`}>
                    <div className={`${isMobile ? "absolute left-1/2 transform -translate-x-1/2" : ""}`}>
                        <Link to="/">
                            <h1 className="text-lg font-jost font-bold">
                                GHBI
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-1 items-center">
                        {
                            navlinks.map(link => (
                                <Button asChild variant="link" size="sm" key={link.href}>
                                    <Link to={link.href} className="text-sm font-jost font-medium">
                                        {link.name}
                                    </Link>
                                </Button>
                            ))
                        }
                    </div>


                </div>


                <div className="space-x-2 flex items-center">
                    <Button asChild size="icon" variant="ghost"
                            className="text-zinc-500 hover:text-black transition-all ease-in-out duration-200">
                        <Link to="/account">
                            <UserCircle className="w-6 h-6"/>
                        </Link>

                    </Button>
                    <Button asChild size="icon" variant="ghost"
                            className="text-zinc-500 hover:text-black transition-all ease-in-out duration-200">
                        <Link to="/cart">
                            <Bag/>
                        </Link>
                    </Button>
                    <div className="mx-2">
                        <RegionDropdown/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function RegionDropdown() {

    const [region, setRegion] = useState<string>("uk")

    return (
        <div>
            <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="border-none shadow-none">
                    <SelectValue placeholder={region}/>
                </SelectTrigger>
                <SelectContent className="font-jost">
                    <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

function Header() {


    return (
        <div className="text-white bg-zinc-800 text-center text-xs py-1">
            FREE SHIPPING ON ALL ORDERS OVER <span className="text-pink-200">$100</span>
        </div>
    )
}

export default Navbar;