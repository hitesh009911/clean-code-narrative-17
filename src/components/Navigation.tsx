
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 mx-auto max-w-screen-lg px-4">
      <div className="mx-auto flex items-center justify-between rounded-full bg-background/80 px-6 py-3 backdrop-blur-md border border-border/50 shadow-md">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold">
            Hitesh<span className="text-primary">H</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <a href="/skills" className="nav-link text-sm">
            Skills
          </a>
          <a href="/projects" className="nav-link text-sm">
            Projects
          </a>
          <a href="/contact" className="nav-link text-sm">
            Contact
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="mt-2 rounded-xl border bg-background/95 px-4 py-4 backdrop-blur-md shadow-md md:hidden">
          <div className="flex flex-col space-y-4">
            <a
              href="/skills"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
            <a
              href="/projects"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a
              href="/contact"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
