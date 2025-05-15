import {Bag, UserCircle} from "@phosphor-icons/react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

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
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-md">
            <Header/>
            <div className="flex w-full items-center justify-between py-2 px-4">
                <div>
                    <Link to="/">
                        <h1 className="text-lg font-jost font-bold">
                            GHBI
                        </h1>
                    </Link>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-1 items-center">
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
                <div className="space-x-2 flex items-center">
                    <Button size="icon" variant="ghost"
                            className="text-zinc-500 hover:text-black transition-all ease-in-out duration-200">
                        <UserCircle className="w-6 h-6"/>
                    </Button>
                    <Button size="icon" variant="ghost"
                            className="text-zinc-500 hover:text-black transition-all ease-in-out duration-200">
                        <Bag/>
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
            <Select  value={region} onValueChange={setRegion}>
                <SelectTrigger className="border-none shadow-none">
                    <SelectValue placeholder={region} />
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