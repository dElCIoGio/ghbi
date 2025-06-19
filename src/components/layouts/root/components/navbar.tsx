import {Bag, UserCircle, List} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button";
import {Link, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useIsMobile} from "@/hooks/use-mobile";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import logo from "@/assets/ghbi-logo.jpg"


const navlinks: {
    name: string,
    href: string,
}[] = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: "Shop",
        href: '/shop'
    },
    {
        name: 'About',
        href: '/about-us'
    },
    {
        name: 'Contact',
        href: '/contact'
    }
]

function Navbar() {
    const isMobile = useIsMobile();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [location]);

    return (
        <nav className="sticky top-0 z-50 w-full bg-black text-white backdrop-blur-md">
            <div className="flex w-full items-center justify-between py-2 px-4">
                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Drawer direction="top" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-300"
                            >
                                <List className="w-6 h-6" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="pt-8 pb-6 px-6">
                            <div className="flex flex-col space-y-4">
                                {navlinks.map((link) => (
                                    <Button
                                        asChild
                                        variant="ghost"
                                        key={link.href}
                                        className="justify-start rounded-full text-left text-base font-jost text-zinc-800"
                                    >
                                        <Link to={link.href}>{link.name}</Link>
                                    </Button>
                                ))}
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div
                    className={`flex w-full items-center ${
                        isMobile ? "justify-center" : "justify-between"
                    }`}
                >
                    <div
                        className={`${
                            isMobile
                                ? "absolute left-1/2 transform -translate-x-1/2"
                                : ""
                        }`}
                    >
                        <Link to="/">
                            <div className="h-12 overflow-hidden flex items-center">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-22 scale-125 object-contain"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-1 items-center">
                        {navlinks.map((link) => (
                            <Button asChild variant="link" size="sm" key={link.href}>
                                <Link
                                    to={link.href}
                                    className="text-sm font-inter font-medium text-white hover:text-zinc-300"
                                >
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-x-0.5 flex items-center">
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="text-zinc-300 hidden hover:bg-zinc-800 hover:text-zinc-300"
                    >
                        <Link to="/auth/login">
                            <UserCircle className="w-6 h-6" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="icon"
                        variant="ghost"
                        className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-300"
                    >
                        <Link to="/cart">
                            <Bag />
                        </Link>
                    </Button>
                    <div className="mx-2">
                        <RegionDropdown />
                    </div>
                </div>
            </div>
        </nav>
    );
}

function RegionDropdown() {
    const [region, setRegion] = useState<string>("uk");

    return (
        <div className="hidden">
            <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="border-none shadow-none">
                    <SelectValue placeholder={region} />
                </SelectTrigger>
                <SelectContent className="font-jost">
                    <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}


export default Navbar;