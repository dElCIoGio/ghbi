import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-black text-white font-inter">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Top nav links */}
        <nav className="flex flex-wrap gap-8 text-sm font-semibold tracking-widest uppercase justify-center md:justify-start">
          <a href="#contact" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">Instagram</a>
          <a href="#work" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">Facebook</a>
          <a href="#insights" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">X</a>
          <a href="#careers" className="hover:underline hover:px-2 ease-in-out transition-all duration-150">Tik tok</a>
        </nav>

        {/* Main content */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Join for insights */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-jost font-bold mb-8">JOIN FOR MONTHLY INSIGHTS</h2>
            <form className="flex items-center max-w-md border-b border-zinc-700 focus-within:border-white transition-colors">
              <Input
                type="email"
                placeholder="your email"
                className="bg-transparent border-none text-white placeholder:text-zinc-400 focus:ring-0 focus:outline-none px-0 py-3 text-lg flex-1"
                aria-label="Your email"
              />
              <Button type="submit" size="icon" className="bg-transparent hover:bg-zinc-900 text-white">
                <ArrowRight className="w-6 h-6" />
              </Button>
            </form>
          </div>

          {/* Right: Contact info */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start md:items-end gap-2 text-right">
            <div className="text-2xl font-jost font-bold mb-2">GHBI</div>
            <div>379 West Broadway</div>
            <div>New York, 10012</div>
            <div>(646)-982-1574</div>
            <div className="truncate">newbusiness@ghbi.com</div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400 gap-2 border-t border-zinc-800 pt-6">
          <div>©2025 GHBI</div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            {/* Socials if needed, or leave empty for now */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;