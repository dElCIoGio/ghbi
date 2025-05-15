import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

function Footer() {
    return (
        <footer className="w-full bg-zinc-50 font-inter">
            <div className="px-10 py-10">
                <div className="flex items-start justify-between">
                    <div className="text-3xl">
                        Join the GHBI Community now
                    </div>
                    <div className="text-zinc-500 text-sm">
                        Over 50.000 satisfied customers have joined the GHBI community.
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button className="p-0 hover:px-2" asChild variant="link">
                        <Link to="https://www.instagram.com/" className="text-xs">
                            INSTAGRAM
                        </Link>
                    </Button>
                    <Button className="p-0 hover:px-2" asChild variant="link">
                        <Link to="https://www.tiktok.com/" className="text-xs">
                            TIKTOK
                        </Link>
                    </Button>
                    <Button className="p-0 hover:px-2" asChild variant="link">
                        <Link to="https://www.facebook.com/" className="text-xs">
                            FACEBOOK
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-end text-8xl font-jost text-zinc-200">
                    GHBI
                </div>
            </div>
            <div>

            </div>
        </footer>
    );
}

export default Footer;