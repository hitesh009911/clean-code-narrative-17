
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold">
            Hitesh<span className="text-primary">H</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <a href="/" className="nav-link text-sm">
            Home
          </a>
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
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <a
              href="/"
              className="text-sm"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
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
