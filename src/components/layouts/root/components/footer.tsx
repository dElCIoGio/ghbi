import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/ghbi-logo.jpg";
import axios from "axios";
import {toast} from "sonner";
import {useState} from "react";

function Footer() {

  const [email, setEmail] = useState<string>("")
  const [, setIsSubmitting] = useState<boolean>(false)


  const onSubmit = async () => {
    setIsSubmitting(true)


    try {
      // Simulate API call
      await axios.post(`https://hook.eu2.make.com/xue6nsqjhu3vglj24m1kc61vimxxdk32`, {email})

      toast.success("Email submitted successfully!")

      setEmail("")
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
      <footer className="w-full bg-black text-white font-inter">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
          {/* Top nav links */}
          <nav className="flex flex-wrap gap-8 text-sm font-semibold tracking-widest uppercase justify-center md:justify-start">
            <a target="_blank"
               rel="noopener noreferrer" href="https://www.instagram.com/glossyhairbyisis" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">Instagram</a>
            <a target="_blank"
               rel="noopener noreferrer" href="https://www.tiktok.com/@glossyhairbyisis" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">Tik tok</a>
          </nav>

          {/* Main content */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">

            {/* Left: Join for insights */}
            <div className="flex-1 min-w-[250px]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-jost font-bold mb-8">JOIN FOR MONTHLY INSIGHTS</h2>
              <form className="flex items-center max-w-md border-b border-zinc-700 focus-within:border-white transition-colors">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email"
                    className="bg-transparent border-none text-white placeholder:text-zinc-400 focus:ring-0 focus:outline-none px-0 py-3 text-lg flex-1"
                    aria-label="Your email"
                />
                <Button onClick={() => onSubmit()} type="button" size="icon" className="bg-transparent hover:bg-zinc-900 text-white">
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </form>
            </div>

            {/* Right: Contact info */}
            <div className="flex-1 min-w-[220px] flex flex-col items-start md:items-end gap-2 text-right">
              <div className="h-22 overflow-hidden flex items-center mb-2">
                <img src={logo} alt="GHBI logo" className="h-full scale-125 object-contain" />
              </div>
              <div className="hidden">
                <div>379 West Broadway</div>
                <div>New York, 10012</div>
                <div>(646)-982-1574</div>
                <div className="truncate">newbusiness@ghbi.com</div>
              </div>

            </div>
          </div>

          {/* Bottom row */}
          <div
              className="flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 gap-2 border-t border-zinc-800 pt-6">
            <div>©2025 GHBI, All rights reserved</div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              {/* Socials if needed */}
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
