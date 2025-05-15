import { Hero } from "@/components/pages/about-us/Hero"
import { Beginning } from "@/components/pages/about-us/Beginning"
import { Mission } from "@/components/pages/about-us/Mission"
import { Products } from "@/components/pages/about-us/Products"
import { Team } from "@/components/pages/about-us/Team"
import { Commitment } from "@/components/pages/about-us/Commitment"
import { Testimonials } from "@/components/pages/about-us/Testimonials"

export default function AboutPage() {
    return (
        <div className="flex w-full flex-col font-jost">
            <div className="flex-1">
                <Hero />
                <Beginning />
                <Mission />
                <Products />
                <Team />
                <Commitment />
                <Testimonials />
            </div>
        </div>
    )
}

